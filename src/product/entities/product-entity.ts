import { Client } from "src/client/entities/client.entity";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Client, (client) => client.product, { onDelete: 'CASCADE' })
  client: Client;
}