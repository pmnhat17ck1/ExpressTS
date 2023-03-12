import { Request, Response } from 'express';

import { response } from '@/utils/response.util';
import { NotificationI } from '@/interfaces/notification.interface';
import {
  CreateNotificationDTO,
  UpdateNotificationDTO,
  DeleteNotificationDTO,
} from '@/dtos/notification.dto';
import db from '@/models';
const { Notification } = db;
//products/:id/ratings
class NotificationController {
  public getAllNotificationByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const notifications: NotificationI = await Notification.findAll({
        where: { account_id: req.account.id },
      });
      if (!notifications) {
        return response(res, 404);
      }
      response(res, 200, notifications, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public createNotificationByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { content, isRead }: CreateNotificationDTO = req.body;

      const notification = await Notification.create({
        content,
        isRead,
        account_id: req.account.id,
      });
      response(res, 200, notification, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public updateNotificationByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { content, isRead, notification_id }: UpdateNotificationDTO =
        req.body;

      const notification = await Notification.update(
        {
          content,
          isRead,
        },
        {
          where: {
            id: notification_id,
          },
        }
      );
      response(res, 200, notification, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteNotificationByAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { notification_id }: DeleteNotificationDTO = req.body;
      const notification = await Notification.findByPk(notification_id);
      if (!notification) {
        return response(res, 404);
      }
      await notification.destroy();
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { NotificationController };
