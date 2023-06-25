import { ApiPropertyOptions } from '@nestjs/swagger';

export const nameProps: ApiPropertyOptions = {
  description: 'Name of the chat',
  example: 'Secret chat',
  required: true,
  maxLength: 30,
};

export const usersProps: ApiPropertyOptions = {
  description: 'Chat members',
  example: [1, 2, 3],
  required: true,
  uniqueItems: true,
  type: 'number[]',
};

export const idProps: ApiPropertyOptions = {
  description: 'Chat ID',
  example: 1,
  required: true,
};
