import { IsString, IsDate } from 'class-validator';
import { AccountI } from '@/interfaces/account.interface';
export class CreateTodoDTO {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsDate()
  public dueDate: Date;

  @IsDate()
  public created_at: Date;

  @IsDate()
  public updated_at: Date;
}

export class UpdateTodoDTO extends CreateTodoDTO {
  @IsString()
  public todo_id: string;
}

export class DeleteTodoDTO extends UpdateTodoDTO {
  public listTodoIds: Array<AccountI>;
}
