import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add')
  async createOne(@Body() body: UserDTO) {
    return this.userService.createOne(body);
  }
}
