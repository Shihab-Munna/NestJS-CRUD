import { IsString } from 'class-validator';

export class subTaskDto {
  @IsString()
  subTask: string;
  @IsString()
  status: string;
  @IsString()
  task: string;
}
