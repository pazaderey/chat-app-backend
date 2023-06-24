import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Creates new user in the database' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User input is invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'User with such name already exists',
  })
  @Post('add')
  async createOne(@Body() body: UserDTO) {
    return this.userService.createOne(body);
  }
}
