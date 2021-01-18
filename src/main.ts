import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { patchSelectQueryBuilder } from 'typeorm-scope';

async function bootstrap() {
  patchSelectQueryBuilder();
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => {
    console.log(`Server Running at: http://localhost/3000`);
  });
}
bootstrap();
