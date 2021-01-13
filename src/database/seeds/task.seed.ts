import { Task } from './../../modules/tasks/entities/task.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Task)().createMany(10);
  }
}
