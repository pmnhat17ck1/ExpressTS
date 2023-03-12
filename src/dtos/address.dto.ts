import { IsString, IsBoolean, IsNumber } from 'class-validator';

class CreateAddressDTO {
  @IsString()
  public street: string;

  @IsString()
  public city: string;

  @IsString()
  public state: string;

  @IsString()
  public zipCode: string;

  @IsBoolean()
  public isDefault: boolean | null;
}

class UpdateAddressDTO extends CreateAddressDTO {
  @IsNumber()
  address_id: number;
}

class DeleteAddressDTO extends UpdateAddressDTO {}

export { CreateAddressDTO, UpdateAddressDTO, DeleteAddressDTO };
