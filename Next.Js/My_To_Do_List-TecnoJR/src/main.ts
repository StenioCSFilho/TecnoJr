import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: false }));

  app.enableCors({
    origin: 'http://localhost:3000', // quais endereços de ip podem acessar a API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Metodos utilizados
    allowedHeaders: 'Content-Type, Accept', //quais headers podem ser enviados
  });
  //app.enableCors(); //permite que qualquer endereço de ip acesse a API
  const port = app.get(ConfigService).get('PORT') || 3001;
  await app.listen(port);
}
bootstrap();
