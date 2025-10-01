import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product-entity';
 
@Module({
  imports: [
    ClientModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0791566334',
    database: 'client_crud',
    entities: [Client, Product],
    autoLoadEntities: true,
    synchronize: true,
  }),
  ClientModule,
  ProductModule,
   
  
],
providers: [
  { provide: APP_FILTER, useClass: AllExceptionsFilter },
  { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
]

})

export class AppModule {}

