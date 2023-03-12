import { IsString, IsNumber } from 'class-validator';

export class CreateCountryDTO {
  @IsString()
  public name: string;

  @IsString()
  public code: Date;
}

export class UpdateCountryDTO extends CreateCountryDTO {
  @IsNumber()
  public country_id: number;
}

export class DeleteCountryDTO extends UpdateCountryDTO {}
