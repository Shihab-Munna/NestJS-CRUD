import { SubTask } from './../../subtask/entites/subTask.entity';
import { User } from '../../auth/user.entity';
import { Taskstatus } from '../tasks.status.enum';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import slugify from 'slugify';

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  status: Taskstatus;

  @DeleteDateColumn()
  deletedAt?: Date;
  // @Column({ nullable: true, unique: true })
  // slug: string;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((task: Task) => task.user)
  userId: string;

  @OneToMany((type) => SubTask, (subTask) => subTask.task)
  subTasks: SubTask[];

  // @BeforeInsert()
  // slugifiyTitles() {
  //   console.log('this is working');
  //   this.slug = slugify(this.title, {
  //     replacement: '-',
  //     lower: true,
  //     remove: /[*+~.()'"!:@]/g,
  //   });
  // }
}
