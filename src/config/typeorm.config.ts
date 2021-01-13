import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'taskmanagment',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
