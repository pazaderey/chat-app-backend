import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CreateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Creates new user in the database' })
  @ApiCreatedResponse({ description: 'Created', type: Number })
  @ApiBadRequestResponse({ description: 'User input is invalid' })
  @ApiUnprocessableEntityResponse({
    description: 'User with such name already exists',
  })
  @Post('add')
  async createOne(@Body() body: CreateUserDTO) {
    return this.userService.createOne(body);
  }
}
