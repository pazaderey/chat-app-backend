import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

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
