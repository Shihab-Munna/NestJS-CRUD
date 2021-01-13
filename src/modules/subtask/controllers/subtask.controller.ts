import { SubTaskService } from './../services/subtasks.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubTask } from '../entites/subTask.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('subtask')
@UseGuards(AuthGuard())
export class SubtaskController {
  constructor(private subtaskService: SubTaskService) {}

  @Get('/all')
  async getAllSubTask(): Promise<SubTask[]> {
    return await this.subtaskService.getAll();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createTask(@Body() data: any): Promise<any> {
    return this.subtaskService.addsubTask(data);
  }
}
