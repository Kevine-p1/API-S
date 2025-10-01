import { IsString, IsNumber, MinLength,IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example:'$100', description: 'The price of the product' })
  @IsNumber({},{ message: 'Price must be a number' })
  price: number;

  @ApiProperty({ example: 'id number of the client owning the product', description: 'ID of the client owning the product' })
  @IsNumber({},{ message: 'Client ID must be a number' })
  clientId: number;

}

