import { IsNotEmpty, IsString } from 'class-validator';

export class updateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
