import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  public fullName: string;

  @IsDate()
  public dateOfBirth: boolean | null;

  @IsString()
  public avatar: string;
}

export class UpdateProfileDTO extends CreateProfileDTO {
  @IsNumber()
  public notification_id: number;
}

export class DeleteProfileDTO extends UpdateProfileDTO {}
