import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product-entity';
import { UserModule } from './user/user.module';
import { User} from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientModule,
    ProductModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
    password: '0791566334',
    database: 'client_crud',
    entities: [Client, Product, User],
    autoLoadEntities: true,
    synchronize: true,
  }),
  ClientModule,
  ProductModule,
  UserModule,
  AuthModule,
   
  
],
providers: [
  { provide: APP_FILTER, useClass: AllExceptionsFilter },
  { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
]

})

export class AppModule {}

