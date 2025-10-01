import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsNotEmpty} from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty({message: 'Name should not be empty'})
  name: string;

  @ApiProperty()
  @IsEmail({},{message: 'Invalid email format'})
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
}
