import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateNotificationDTO {
  @IsString()
  public content: string;

  @IsBoolean()
  public isRead: boolean | null;
}

export class UpdateNotificationDTO extends CreateNotificationDTO {
  @IsNumber()
  public notification_id: number;
}

export class DeleteNotificationDTO extends UpdateNotificationDTO {}
