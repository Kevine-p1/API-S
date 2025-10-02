import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 
import { ChangePasswordDto } from './dto/change-password.dto';  
import { UserRole } from '../common/enums/user-role.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

 
  async register(dto: RegisterDto): Promise<{ access_token: string; expiresIn: string; user: User }> {
    const createUserDto = {
      name: dto.fullName ?? '',
      email: dto.email,
      password: dto.password,
      role: UserRole.CLIENT,
    };

    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already registered');

    const user = await this.userService.create(createUserDto);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token, expiresIn: '1h', user };
  }

   
  async login(dto: LoginDto): Promise<{ access_token: string; expiresIn: string; user: User }> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token, expiresIn: '1h', user };
  }

   
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<User> {
    const user = await this.userService.findOne(userId);
    const passwordMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Old password is incorrect');

    const updatedUser = await this.userService.updatePassword(userId, dto.newPassword);
    return updatedUser;
  }
}
