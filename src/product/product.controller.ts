import { Controller,Get,Post,Patch,Param,Delete, Body, ParseIntPipe } from '@nestjs/common';
import {ApiTags,ApiOperation,ApiBody,ApiResponse,ApiParam } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product-entity';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [Product] })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.productService.findAll(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProduct: CreateProductDto) {
    return this.productService.create(createProduct);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProduct: UpdateProductDto) {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}