import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { SubTaskService } from 'src/modules/subtask/services/subtasks.service';
//00import { RsSlugify } from 'src/app/utils';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Task } from '../entities/task.entity';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly subTaskService: SubTaskService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  // public async afterInsert(event: InsertEvent<Task>) {
  //   const data = {
  //     subTask: 'New SubScribers',
  //     status: 'TODO',
  //     task: event.entity,
  //   };
  //   const subTask = this.subTaskService.addsubTask(data);
  //   if (!subTask) console.log('No Task Created');
  //   console.log('Sub Task Created');
  // }

  //   public async beforeInsert(event: InsertEvent<Task>) {
  //     console.log('call from category subscriber beforeInsert');
  //     console.log('Sunscribers: ', event.entity);

  //     // event.entity.slug = RsSlugify(event.entity.title);
  //   }

  //   public async beforeUpdate(event: UpdateEvent<Task>) {
  //     console.log('call from category subscriber beforeUpdate');
  //     // if (event.entity.name) {
  //     //     event.entity.slug = RsSlugify(event.entity.title);
  //     // }
  //   }
}
