import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Updates username by ID' })
  @ApiNoContentResponse({ description: 'Updated' })
  @ApiBadRequestResponse({ description: 'User input is invalid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnprocessableEntityResponse({
    description: 'User with such name already exists',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update')
  async updateOne(@Body() body: UpdateUserDTO) {
    await this.userService.updateOne(body);
  }
}
