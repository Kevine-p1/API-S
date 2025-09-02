import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';
//import { ProductModule } from './product/product.module';
 

@Module({
  imports: [
    ClientModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0791566334',
    database: 'client_crud',
    entities: [Client],
    autoLoadEntities: true,
    synchronize: true,
  }),
  ClientModule,
  //ProductModule,
],
})
export class AppModule {}

