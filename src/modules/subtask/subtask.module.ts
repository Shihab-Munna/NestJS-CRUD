import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SubtaskController } from './controllers/subtask.controller';
import { SubTask } from './entites/subTask.entity';
import { SubTaskService } from './services/subtasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask]), AuthModule],
  controllers: [SubtaskController],
  providers: [SubTaskService],
  exports: [SubTaskService],
})
export class SubtaskModule {}
