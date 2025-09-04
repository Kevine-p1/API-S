import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product-entity';
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.client)
  product: Product[];
}
