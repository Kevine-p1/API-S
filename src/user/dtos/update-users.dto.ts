// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'New Jane' })
  name?: string;

  @ApiPropertyOptional({ example: 'newjane@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123' })
  password?: string;
}
