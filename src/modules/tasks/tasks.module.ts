import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './services/tasks.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Task } from './entities/task.entity';
import { SubTask } from '../subtask/entites/subTask.entity';
import { SubtaskModule } from '../subtask/subtask.module';
import { TaskSubscriber } from './subscribers/task.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, SubtaskModule],
  controllers: [TasksController],
  providers: [TasksService, TaskSubscriber],
})
export class TasksModule {}
