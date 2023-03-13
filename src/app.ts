import express, { NextFunction, Request, Response, Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import DB from '@models/index';
import config from '@config';
import { logger, stream } from '@utils/logger';
import errorHandler from '@middlewares/error.middleware';
import { GetRoutes } from '@routes/index';
import { getAppVersion, apiLimiter } from '@utils/common.util';

class App {
  public app: Application;
  public env: string;
  public version: string;
  public port: string | number;
  public routes: any;

  constructor() {
    this.app = express();
    this.env = config.NODE_ENV || 'development';
    this.version = config.APP_VERSION || 'default';
    this.port = config.PORT || 8000;
    this.routes = new GetRoutes();
    this.syncDatabase();
    this.syncAssociations();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private syncAssociations() {
    DB.associations();
  }

  private syncDatabase() {
    DB.sync({ force: true });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.LOG_FORMAT, { stream }));
    this.app.use(
      cors({
        origin: config.ORIGIN,
        credentials: config.CREDENTIALS === 'true',
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(
      compression({
        filter: (req: any, res: any) => {
          if (req.headers['x-no-compress']) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        limit: '5mb',
        extended: false,
        parameterLimit: 10000,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.static('public'));
    this.app.use('*/css', express.static('public/css'));
  }

  private initializeRoutes() {
    this.app.get(
      '/*',
      apiLimiter(),
      (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Last-Modified', new Date().toUTCString());
        next();
      }
    );
    this.app.use(
      `/api/${getAppVersion(this.version)}`,
      apiLimiter(),
      this.routes.router
    );
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use(
      '/api-docs',
      apiLimiter(),
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

export default App;
