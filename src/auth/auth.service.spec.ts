import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  
  async register(dto: CreateUserDto) {
     
    const user = await this.userService.create(dto);
    
    const { password, ...result } = user;
    return result;
  }

   
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

 
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userService.findOne(userId);

    const isOldValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldValid) throw new UnauthorizedException('Old password is incorrect');

    return this.userService.updatePassword(userId, newPassword);
  }
}

