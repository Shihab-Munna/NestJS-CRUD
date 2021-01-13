import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Taskstatus } from '../tasks.status.enum';

export class getTaskfilterDto {
  @IsOptional()
  @IsIn([Taskstatus.DONE, Taskstatus.IN_PROGRESS, Taskstatus.TODO])
  status: Taskstatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
