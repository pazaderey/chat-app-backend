import { compareSync, hashSync } from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDTO) {
    const candidate = await this.userService.getByUsername(dto.username);
    if (candidate) {
      throw new BadRequestException(`User ${dto.username} already exists`);
    }
    const hashedPass = hashSync(dto.password, 8);
    const user = await this.userService.createOne({
      ...dto,
      password: hashedPass,
    });
    return this.generateToken(user);
  }

  async login(dto: CreateUserDTO) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDTO) {
    const user = await this.userService.getByUsername(dto.username);
    if (!user) {
      throw new NotFoundException(`User ${dto.username} not found`);
    }
    const passwordsEqual = compareSync(dto.password, user.password);
    if (passwordsEqual) {
      return user;
    }
    throw new UnauthorizedException(`Invalid credentials`);
  }
}
