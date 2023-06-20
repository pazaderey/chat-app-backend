import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add')
  async createOne(createUser: UserDTO) {
    return this.userService.createOne(createUser);
  }
}
