import { ApiPropertyOptions } from '@nestjs/swagger';

export const idProps: ApiPropertyOptions = {
  description: 'Message ID',
  example: 1,
  required: true,
};

export const usernameProps: ApiPropertyOptions = {
  description: 'Username used in the chat',
  example: 'Carl',
  required: true,
  maxLength: 30,
};

export const passwordProps: ApiPropertyOptions = {};
