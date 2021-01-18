import { Task } from 'src/modules/tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
