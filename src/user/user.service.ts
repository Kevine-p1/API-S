import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // REGISTER new user (used by auth.register too)
  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return await this.userRepo.save(user);
  }

  // PAGINATED USERS
  async findAll(page = 1, limit = 10): Promise<{ data: User[]; total: number; page: number; limit: number; totalPages: number }> {
    const [data, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // FIND BY ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  // UPDATE (generic)
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(user, dto);
    return await this.userRepo.save(user);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  // 🔑 NEEDED FOR AUTH MODULE ---------------------

  // Find by email (login)
 async findByEmail(email: string): Promise<User | null> {
  return await this.userRepo.findOne({ where: { email } });
}


  // Update password (change-password)
  async updatePassword(id: string, newPassword: string): Promise<User> {
    const user = await this.findOne(id);
    user.password = await bcrypt.hash(newPassword, 10);
    return this.userRepo.save(user);
  }
}
