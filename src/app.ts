import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

import DB from "@models/index";
import config from "@config";
import { logger, stream } from "@utils/logger";
import errorHandler from "@middlewares/error.middleware";
import { getRoutes } from "@routes/index";
import { getAppVersion } from "@utils/common.util";

class App {
  public app: express.Application;
  public env: string;
  public version: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = config.NODE_ENV || "development";
    this.version = config.APP_VERSION || "default";
    this.port = config.PORT || 8000;

    this.connectToDatabase();
    this.syncAssociations();
    this.syncDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
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

  private connectToDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected...");
      })
      .catch((err: any) => console.log(`Connect database error: ${err}`));
  }

  private syncAssociations() {
    DB.associations();
  }

  private syncDatabase() {
    DB.sequelize.sync({ alter: true });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.LOG_FORMAT, { stream }));
    this.app.use(
      cors({
        origin: config.ORIGIN,
        credentials: config.CREDENTIALS === "true",
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(
      compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req: any, res: any) => {
          if (req.headers["x-no-compress"]) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        limit: "5mb",
        extended: false,
        parameterLimit: 10000,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.static("public"));
    this.app.use("*/css", express.static("public/css"));
  }

  private initializeRoutes() {
    this.app.get("/*", (req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Last-Modified", new Date().toUTCString());
      next();
    });
    this.app.use(`/api/${getAppVersion(this.version)}`, getRoutes());
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

export default App;
