import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateAccountDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  @IsPhoneNumber('VN')
  public phone: number;
}

export class LoginAccountDTO {
  @IsString()
  public username: string;

  @IsString()
  @IsStrongPassword({ minLength: 6 })
  public password: string;
}
