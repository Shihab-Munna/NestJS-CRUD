import { Task } from 'src/modules/tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Scope } from 'typeorm-scope';

@Scope<SubTask>([(qb, alias) => qb.andWhere(`${alias}.deletedAt IS NULL`)])
@Entity({ name: 'Subtask' })
export class SubTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subTask: string;

  @Column({ nullable: false })
  status: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column()
  taskId: string;

  @ManyToOne((type) => Task, (task) => task.subTasks)
  task: Task;

  // @RelationId((subTask: SubTask) => subTask.task)
  // taskId: string;
}
