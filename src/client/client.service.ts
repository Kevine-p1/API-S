import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto, UpdateClientDto } from './dto';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create( createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    await this.clientRepository.update(id, updateClientDto);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.clientRepository.delete(id);
    return { deleted: true };
  }
}