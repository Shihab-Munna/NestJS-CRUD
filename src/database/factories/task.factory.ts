import { Taskstatus } from './../../modules/tasks/tasks.status.enum';
import Faker from 'faker';
import { User } from 'src/modules/auth/user.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { define, factory } from 'typeorm-seeding';

define(Task, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const title = faker.name.firstName(gender);

  const task = new Task();
  task.title = title;
  task.description = faker.lorem.word(5);
  task.status = Taskstatus.TODO;
  task.user = factory(User)() as any;
  return task;
});
