import { IsString, IsNumber } from 'class-validator';

export class CreateLikeDTO {
  @IsString()
  public like: string;
}

export class UpdateLikeDTO extends CreateLikeDTO {
  @IsNumber()
  public like_id: number;
}

export class DeleteLikeDTO extends UpdateLikeDTO {}
