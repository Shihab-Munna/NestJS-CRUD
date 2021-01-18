import { GetUser } from '../../auth/decoretors/getuser.decoretor';
import { User } from '../../auth/user.entity';
import { TaskStatusValidatonPipe } from '../pipes/task-status-validation.pipe';
import { getTaskfilterDto } from '../dto/get-task-filter.dto';
import { TasksService } from '../services/tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Taskstatus } from '../tasks.status.enum';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { updateTaskDto } from '../dto/updateTaskDTO';
import { createTaskDto } from '../dto/create-task.dto';
import { database } from 'faker';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTask(
    @Req() req: Request,
    @Query(ValidationPipe) filterDto: getTaskfilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    // this.logger.info('Get Request to get all task');
    // this.logger.error('Error Happend');
    return this.tasksService.getTask(filterDto, user);
  }

  @Get('/search')
  async searchWithMeili(@Body() serachData: any) {
    return await this.tasksService.searchWithMeili(serachData.searchTerm);
  }

  @Get('/all')
  async allTask(): Promise<any> {
    console.log('reached');
    return this.tasksService.getAll();
  }
  @Get('/:id')
  getTaskByid(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: any,
    @GetUser() user: User,
  ): Promise<Task> {
    if (user && user.id) createTaskDto.user = user.id;
    // return await this.tasksService.createTask(createTaskDto, user);
    return await this.tasksService.createTaskWithSubTask(createTaskDto, user);
  }

  @Post('/meilesearch')
  @UsePipes(ValidationPipe)
  async createTaskWithMeilisearch(
    @Body() data: createTaskDto,
    @GetUser() user: User,
  ) {
    console.log('Call Form MeiliSearch');

    console.log('User: ', user);

    return await this.tasksService.createTaskWithMelisearch(data, user);
  }

  @Post('/with-subtask')
  // @UsePipes(ValidationPipe)
  async createTaskWithSubTask(
    @Body() data: any,
    @GetUser() user: User,
  ): Promise<Task> {
    console.log('Call From with-subTask');
    console.log('Data From Conteroller', data);
    console.log('User', user);

    return await this.tasksService.createTaskWithSubTask(data, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidatonPipe) status: Taskstatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status, user);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() data: updateTaskDto,
  ): Promise<any> {
    console.log('Call from task controller : ', data);

    return this.tasksService.updateTask(id, data);
  }

  @Delete('/soft-delete/:id')
  softDelete(@Param('id') id: string): Promise<any> {
    return this.tasksService.softDelete(id);
  }
}
