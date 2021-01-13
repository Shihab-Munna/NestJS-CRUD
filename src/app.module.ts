import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { SubtaskModule } from './modules/subtask/subtask.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from './utils/logger.util';
import { AccessLoggeerMiddleware } from './middlwares/accessLogger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './@exception/allExceptionFilter';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(logger.console()),
    TasksModule,
    AuthModule,
    SubtaskModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): void {
//     consumer.apply(AccessLoggeerMiddleware).forRoutes('*');
//   }
// }
