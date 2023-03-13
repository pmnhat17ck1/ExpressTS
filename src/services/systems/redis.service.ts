import { createClient } from 'redis';
import { logger } from '@utils/logger';

export class RedisService {
  public client: any;
  private static instance: RedisService;
  constructor() {
    this.initRedis();
    this.connect();
    this.handleError();
  }
  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async connect(): Promise<void> {
    await this.client.on('connect', () => {
      console.log('Kết nối đến Redis thành công');
    });
  }

  private async initRedis(): Promise<void> {
    const url = process.env.REDIS_URL;
    this.client = await createClient({ url });
  }

  private async handleError(): Promise<void> {
    await this.client.on('error', (error) =>
      logger.error(`[Redis] ERROR >> StatusCode:: ${500}, Message:: ${error}`)
    );
  }
  public setObject(key, value) {
    this.client.set(key, JSON.stringify(value), (error) => {
      if (error) {
        logger.error(
          `[Redis] ERROR >> StatusCode:: ${404}, Message:: ${error}`
        );
      } else {
        console.log('Lưu đối tượng vào Redis thành công');
      }
    });
  }
  public getObject(key, callback) {
    this.client.get(key, (error, result) => {
      if (error) {
        logger.error(
          `[Redis] ERROR >> StatusCode:: ${404}, Message:: ${error}`
        );
        callback(error, null);
      } else {
        console.log('Lấy giá trị từ Redis thành công');
        const obj = JSON.parse(result);
        callback(null, obj);
      }
    });
  }
  public deleteKey(key) {
    this.client.del(key, (error) => {
      if (error) {
        logger.error(
          `[Redis] ERROR >> StatusCode:: ${404}, Message:: ${error}`
        );
      } else {
        console.log('Xóa giá trị từ Redis thành công');
      }
    });
  }
}
