import { IsString, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example:'The price of the product', description: 'The price of the product' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'id number of the client owning the product', description: 'ID of the client owning the product' })
  @IsNumber()
  clientId: number;

}

