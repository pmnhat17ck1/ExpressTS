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

  @IsString()
  public account_id: string;
}

class UpdateAccountDTO extends CreateAccountDTO {
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
