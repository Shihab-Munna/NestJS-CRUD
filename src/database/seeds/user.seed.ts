// import { User } from './../../modules/auth/user.entity';
// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import { Task } from 'src/modules/tasks/entities/task.entity';

// export default class CreateUsers implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await factory(User)()
//       .map(
//         async (user: User): Promise<any> => {
//           const tasks: Task[] = await factory(Task)().createMany(2);
//           const TaskIds = tasks.map((task: Task) => task.id);
//           await user.tasks.attach(TaskIds);
//         },
//       )
//       .createMany(5);
//   }
// }
