import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
