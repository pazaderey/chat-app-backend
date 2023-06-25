import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './dto';
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

  @ApiOperation({ summary: 'Updates username by ID' })
  @ApiNoContentResponse({ description: 'Updated' })
  @ApiBadRequestResponse({ description: 'User input is invalid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnprocessableEntityResponse({
    description: 'User with such name already exists',
  })
  @Patch('update')
  async updateOne(@Body() body: UpdateUserDTO) {
    this.userService.updateOne(body);
  }
}
