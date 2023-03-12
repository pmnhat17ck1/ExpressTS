import { IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  public content: string;
}
