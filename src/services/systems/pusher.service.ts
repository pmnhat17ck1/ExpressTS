import PusherApi from 'pusher';

export class PusherService {
  public pusher: any;
  public appId = process.env.NODE_APP_PUSHER_APP_ID;
  public key = process.env.NODE_APP_PUSHER_APP_KEY;
  public secret = process.env.NODE_APP_PUSHER_APP_SECRET;
  public cluster = process.env.NODE_APP_PUSHER_APP_CLUSTER;
  public useTLS = true;
  private static instance: PusherService;

  constructor() {
    this.initPusher();
  }
  public static getInstance(): PusherService {
    if (!PusherService.instance) {
      PusherService.instance = new PusherService();
    }
    return PusherService.instance;
  }

  private async initPusher() {
    this.pusher = new PusherApi({
      appId: this.appId,
      key: this.key,
      secret: this.secret,
      cluster: this.cluster,
      useTLS: true,
    });
  }
  // Hàm gửi sự kiện tới một kênh của Pusher
  public async sendEventToChannel(channelName, eventName, data) {
    this.pusher.trigger(channelName, eventName, data);
  }
}
