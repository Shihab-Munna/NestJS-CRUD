import { successPlaceholder } from 'src/utils/responsePlaceholder.util';
import { User } from '../../auth/user.entity';
import { Task } from '../entities/task.entity';
import { getTaskfilterDto } from '../dto/get-task-filter.dto';
import { createTaskDto } from '../dto/create-task.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Taskstatus } from '../tasks.status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/modules/auth/decoretors/getuser.decoretor';
import { Connection, Repository, getConnection, Brackets } from 'typeorm';
import { SubTask } from 'src/modules/subtask/entites/subTask.entity';
import dtoToModelMapper from 'src/helper/mapper/dtoToModel.mapper';
// import { client } from 'src/helper/meiliSearch.config';
import { TaskDocs } from 'src/helper/taskDoccument';
// import MeiliSearch from 'meilisearch';
import { client } from 'src/externals/meiliConfig';
import { StoreTaskInMeiliSerach } from 'src/externals/StoreTaskInMeiliSerach';

@Injectable()
export class TasksService {
  //private logger = newLogger("TaskService")
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private connection: Connection,
  ) {
    //super(taskRepository, { useSoftDelete: true });
  }

  async getAll() {
    const all = await this.taskRepository.find({
      relations: ['subTasks', 'user'],
    });

    return successPlaceholder('All Task With User And Sub Task', all);
  }

  /////////////////////////////////////////////////////////////////////////////

  async getTask(filterDto: getTaskfilterDto, user: User): Promise<Task[]> {
    try {
      const { status, search } = filterDto;
      const query = this.taskRepository.createQueryBuilder('task');
      query.where('task.user_Id = :user_Id', { user_Id: user.id });
      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere(
          '(task.title LIKE :search OR task.description LIKE :search)',
          { search: `%${search}%` },
        );
      }

      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      return error;
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    try {
      const taskFound = await this.taskRepository.findOne({
        where: { id, user: user.id },
        relations: ['subTasks', 'user'],
      });

      // const taskUsingId = await getConnection()
      //   .createQueryBuilder()
      //   .select('task')
      //   .from(Task, 'task')
      //   .where('task.id = :id', { id: id })
      //   .andWhere('task.status = :status', { status: 'TODO' })
      //   .getOne();

      //  const TastGet = await getConnection()
      //   .createQueryBuilder()
      //   .select('task')
      //   .from(Task, 'task')
      //   .where('task.status = :status', { status: 'TODO' })
      //   .andWhere(
      //     new Brackets((qb) => {
      //       qb.andWhere('task.id = :id', {
      //         id: id,
      //       }).andWhere('task.user_Id = :userId', { userId: user.id });
      //     }),
      //   )
      //   .getOne();
      // //
      if (!taskFound) throw new NotFoundException('Task Not Found!');
      return taskFound;
    } catch (error) {
      return error;
    }
  }

  async createTask(data: any, @GetUser() user: User): Promise<Task> {
    try {
      console.log(data);
      return this.taskRepository.save(data);
    } catch (error) {
      return error;
    }
  }

  async createTaskWithSubTask(data: any, @GetUser() user: User): Promise<Task> {
    // console.log('data', data);
    console.log('Call From With Task');
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const mapedData = dtoToModelMapper(Task, data);
        console.log('Maped Data: ', mapedData);

        // const newTask = new Task();
        // newTask.title = data.title;
        // newTask.description = data.description;
        // newTask.user = user;
        const task = await queryRunner.manager.save(mapedData);
        console.log('Task Created', task);
        if (task.id) {
          const newSubTask = {
            subTask: data.subTask,
            status: data.status,
            task: task,
          };
          const newSubTaskCreated = await queryRunner.manager.save(
            SubTask,
            newSubTask,
          );
          //console.log('Sub Task Created: ', newSubTaskCreated);
        }

        await queryRunner.commitTransaction();
        console.log('Transection Commited');

        return await this.getTaskById(task.id, user);
      } catch (error) {
        console.log('error', error);

        console.log('Error in transection');
        await queryRunner.rollbackTransaction();
      } finally {
        console.log('Relese!!');

        await queryRunner.release();
      }
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log('Users: ', user);
      // const isdeleted = await this.taskRepository.delete({
      //   id,
      //   user: user,
      // });
      const deleteSubTask = await queryRunner.manager.delete(SubTask, {
        task: id,
      });

      const isdeleted = await queryRunner.manager.delete(Task, {
        id,
        user: user,
      });
      await queryRunner.commitTransaction();
      if (isdeleted.affected === 0)
        throw new NotFoundException(`No Such Task To delete`);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateStatus(
    id: string,
    status: Taskstatus,
    user: User,
  ): Promise<Task> {
    try {
      const task = await this.getTaskById(id, user);
      if (!task) throw new NotFoundException('This task Not Found');
      task.status = status;
      return task;
    } catch (error) {
      return error;
    }
  }

  async updateTask(id: string, data: any): Promise<any> {
    console.log('Call From Updated Task...');
    data.id = id;
    console.log(data);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatePayload = { ...data };
      const dataToUpdate = dtoToModelMapper(Task, updatePayload);
      const updated = await queryRunner.manager.save(dataToUpdate);
      console.log('Updated: ', updated);
      await queryRunner.commitTransaction();
      return updated;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async softDelete(id: string): Promise<any> {
    return this.taskRepository.softDelete(id);
  }

  async createTaskWithMelisearch(data: any, user: User): Promise<any> {
    let index = client.getIndex('tasks');
    if (!index) index = await client.createIndex('tasks');
    console.log('#########----', index);
    // If your index does not exist
    const allIndex = await client.listIndexes();
    console.log('All Index:', allIndex);

    console.log('.....................');
    console.log('-----', user);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      data.user = user;
      // const mapedData = dtoToModelMapper(Task, data);
      // console.log('Maped Data: ', mapedData);
      const task = await queryRunner.manager.save(Task, data);
      const taskDoccumnet = TaskDocs(task);
      console.log('task', taskDoccumnet);
      await queryRunner.commitTransaction();

      StoreTaskInMeiliSerach(index, taskDoccumnet);
      return task;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async searchWithMeili(data: string) {
    const index = client.getIndex('tasks');
    return await index.search(data);
  }
}
