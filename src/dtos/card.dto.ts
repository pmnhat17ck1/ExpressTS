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
}

export class UpdateCardDTO extends CreateCardDTO {
  @IsNumber()
  public card_id: number;
}

export class DeleteCardDTO extends UpdateCardDTO {}
