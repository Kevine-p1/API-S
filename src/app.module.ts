import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product-entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/users-entity';

@Module({
  imports: [
    ClientModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0791566334',
    database: 'client_crud',
    entities: [Client, Product,User],
    autoLoadEntities: true,
    synchronize: true,
  }),
  ClientModule,
  ProductModule,
  UserModule,
  AuthModule,
  
],

})

export class AppModule {}

