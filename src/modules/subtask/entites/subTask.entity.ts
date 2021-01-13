import { Task } from 'src/modules/tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity({ name: 'Subtask' })
export class SubTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subTask: string;

  @Column({ nullable: false })
  status: string;

  @ManyToOne((type) => Task, (task) => task.subTasks)
  task: Task;

  @RelationId((subTask: SubTask) => subTask.task)
  taskId: string;
}
