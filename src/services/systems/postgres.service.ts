import Sequelize from 'sequelize';
import { Client } from 'pg';

import config from '@config';
import { logger } from '@utils/logger';

export class PostgresService {
  public client: any;
  public sequelize: any;
  public Sequelize: any = Sequelize;
  public host = config.POSTGRES_HOST;
  public port = config.POSTGRES_PORT;
  public database = config.POSTGRES_DB;
  public username = config.POSTGRES_USER;
  public password = config.POSTGRES_PASSWORD;
  private static instance: PostgresService;
  constructor() {
    this.initPg();
    this.initSequelize();
  }
  public static getInstance(): PostgresService {
    if (!PostgresService.instance) {
      PostgresService.instance = new PostgresService();
    }

    return PostgresService.instance;
  }
  public async initPg() {
    this.client = new Client({
      user: this.username,
      database: this.database,
      password: this.password,
      port: Number(this.port),
      host: this.host,
    });
    this.client
      .connect()
      .then(() => console.log('Database connected by PG'))
      .catch((err) => console.error('Connect pg database error', err.stack));
  }

  public async initSequelize() {
    this.sequelize = new Sequelize.Sequelize(
      this.database,
      this.username,
      this.password,
      {
        dialect: 'postgres',
        host: this.host,
        port: Number(this.port),
        timezone: '+07:00',
        define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
          underscored: true,
          freezeTableName: true,
        },
        pool: {
          min: 0,
          max: 5,
        },
        logQueryParameters: config.NODE_ENV === 'development',
        logging: (query, time) => {
          logger.info(time + 'ms' + ' ' + query);
        },
        benchmark: true,
      }
    );
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Database connected by Sequelize');
      })
      .catch((err: any) =>
        console.error(`Connect sequelize database error: ${err}`)
      );
  }

  public async listening(table, callback) {
    this.client.query(`LISTEN ${table}`);
    this.client.on('notification', async (msg) => {
      if (msg.channel === table) {
        callback();
      }
    });
  }
  public async unListen(table) {
    this.client.query(`UNLISTEN ${table}`);
  }
}
