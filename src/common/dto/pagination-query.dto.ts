import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;
}
