import { Injectable,NotFoundException } from '@nestjs/common';
import { Product } from './entities/product-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import{CreateProductDto} from './DTO/create-product.dto'
import{UpdateProductDto}from './DTO/update-product.dto'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()

export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}
  async create(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }
  
 async findAll(paginationQuery: PaginationQueryDto) {
  const { page = 1, limit = 10 } = paginationQuery;

  const [data, total] = await this.productRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { id } });
  }
  async update(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }
}