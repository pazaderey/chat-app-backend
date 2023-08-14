import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { UpdateUserDTO } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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
  async updateOne(
    @Headers('authorization') auth: string,
    @Body() body: UpdateUserDTO,
  ) {
    const token = auth.split(' ')[1];
    const updater = this.jwtService.decode(token);
    if ((updater as { [key: string]: any }).id !== body.id) {
      throw new UnauthorizedException('Cannot update other users');
    }
    await this.userService.updateOne(body);
  }
}
