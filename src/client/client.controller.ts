import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private svc: ClientService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of clients returned successfully.' })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.svc.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Client found.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  
  findOne(@Param('id') id: string) {
    return this.svc.findOne(+id);
  }


@Post()
@ApiOperation({ summary: 'Create a new client' })
@ApiBody({ type: CreateClientDto })
@ApiResponse({ status: 201, description: 'Client created successfully.' })
create(@Body() dto: CreateClientDto) {
  return this.svc.create(dto);
}


@Patch(':id')
@ApiOperation({ summary: 'Update an existing client' })
@ApiParam({ name: 'id', type: Number })
@ApiBody({ type: UpdateClientDto })
@ApiResponse({ status: 200, description: 'Client updated successfully.' })
update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
  return this.svc.update(+id, dto);
}


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Client deleted successfully.' })
  delete(@Param('id') id: string) {
    return this.svc.delete(+id);
  }
}
