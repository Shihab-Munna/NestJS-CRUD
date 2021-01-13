import { subTaskDto } from './../dto/subtask.dto';
import { SubTask } from '../entites/subTask.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask) private subTaskRepo: Repository<SubTask>,
  ) {}
  async getAll(): Promise<SubTask[]> {
    return await this.subTaskRepo.find();
  }

  async addsubTask(data: any): Promise<any> {
    return await this.subTaskRepo.save(data);
  }
}
