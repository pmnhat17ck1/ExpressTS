import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateCardDTO {
  @IsString()
  public cardNumber: string;

  @IsDate()
  public expirationDate: Date;

  @IsString()
  public cvv: string;

  @IsNumber()
  public payment_method_id: number;

  @IsNumber()
  public card_id: number;
}
