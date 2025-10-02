import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword' })
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword: string;

  @ApiProperty({ example: 'newP@ssw0rd' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must be at least 6 characters' })
  newPassword: string;
}
