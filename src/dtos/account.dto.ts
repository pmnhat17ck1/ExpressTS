import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

class CreateAccountDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  @IsPhoneNumber('VN')
  public phone: number;

  public account_id: boolean;
}

class UpdateAccountDTO extends CreateAccountDTO {
  @IsBoolean()
  public is_active: boolean | undefined;
}

class LoginAccountDTO {
  @IsString()
  public username: string;

  @IsString()
  @IsStrongPassword({ minLength: 6 })
  public password: string;
}
export { CreateAccountDTO, UpdateAccountDTO, LoginAccountDTO };
