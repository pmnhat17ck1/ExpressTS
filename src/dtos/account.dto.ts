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
  @IsStrongPassword({ minLength: 6 })
  public password: string;

  @IsString()
  @IsPhoneNumber('VN')
  public phone: number | string;
}

class UpdateAccountDTO extends CreateAccountDTO {
  @IsString()
  public account_id: string;
  @IsBoolean()
  public is_active: boolean | null;
}
class LoginAccountDTO {
  @IsString()
  public username: string;

  @IsString()
  @IsStrongPassword({ minLength: 6 })
  public password: string;
}
export { CreateAccountDTO, UpdateAccountDTO, LoginAccountDTO };
