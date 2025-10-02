import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor, HttpException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               
      forbidNonWhitelisted: true,    
      transform: true,              
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
        if (err.constraints) {
         return Object.values(err.constraints)[0];
    }
    return 'Validation failed';
  });
  return new HttpException(
    { statusCode: 400, message: messages.join(', ') },
    400,
  );
},
    }),
  );

  
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle('Store Management API')
    .setDescription('API docs for managing clients, products, and users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3050);
}
bootstrap();
