import { Taskstatus } from '../tasks.status.enum';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusValidatonPipe implements PipeTransform {
  readonly validStatus = [
    Taskstatus.TODO,
    Taskstatus.IN_PROGRESS,
    Taskstatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.ifStatusValid(value))
      throw new BadRequestException('Status is not valid');
    return value;
  }
  private ifStatusValid(status: any): boolean {
    const indx = this.validStatus.indexOf(status);
    return indx !== -1;
  }
}
