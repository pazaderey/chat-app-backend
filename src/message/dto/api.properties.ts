import { ApiPropertyOptions } from '@nestjs/swagger';

export const chatProps: ApiPropertyOptions = {
  description: 'Chat ID to send message',
  example: 1,
  required: true,
};

export const authorProps: ApiPropertyOptions = {
  description: "User ID of the message's author",
  example: 1,
  required: true,
};

export const textProps: ApiPropertyOptions = {
  description: 'Message text',
  example: 'Hello',
  required: true,
  maxLength: 500,
};

export const idProps: ApiPropertyOptions = {
  description: 'Message ID',
  example: 1,
  required: true,
};
