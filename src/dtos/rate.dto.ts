import { IsString } from 'class-validator';

export class CreateRateDTO {
  @IsString()
  public value: string;
  @IsString()
  public comment: string;
}

export class UpdateRateDTO extends CreateRateDTO {}

export class DeleteRateDTO extends UpdateRateDTO {}
