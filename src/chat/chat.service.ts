import { validate } from 'class-validator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { User } from '../user/entities';

import { CreateChatDTO, UpdateChatDTO } from './dto';
import { Chat } from './entities';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.chatRepository.find();
  }

  async getOne(id: number) {
    return this.chatRepository.findOneBy({ id });
  }

  async getByName(name: string) {
    return this.chatRepository.findOneBy({ name });
  }

  async getByUser(userId: number): Promise<Chat[]> {
    // finds all user chats, ordered by last sent message time in it
    const result = await this.chatRepository.manager.query(
      `SELECT "c"."id", "c"."name", "c"."created_at", MAX("m"."created_at") as "last"
      FROM "chat_message" "m"
      JOIN "chat" "c" ON "c"."id" = "m"."chatId"
      JOIN "chat_users_chat_user" "cu" ON "cu"."chatId" = "c"."id"
      WHERE "cu"."chatUserId" = ${userId}
      GROUP BY "c"."id", "c"."name", "c"."created_at"
      ORDER BY "last" DESC;`,
    );

    // due to sql specific the 'created_at' as 'last' column stays with the chat data
    return result.map((c) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { last: _, ...chat } = c;
      return chat;
    });
  }

  async createOne(createChat: CreateChatDTO) {
    const errors = await validate(createChat);
    if (errors.length) {
      throw new HttpException(
        { message: 'Chat input is invalid', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { name, users: userIds } = createChat;
    const existing = await this.chatRepository.findOneBy({ name });
    if (existing !== null) {
      throw new HttpException(
        { message: 'Chat with such name already exists' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const chat = CreateChatDTO.toChat(createChat);

    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    chat.users = users;
    const newChat = await this.chatRepository.save(chat);
    return newChat.id;
  }

  async updateOne(updateChat: UpdateChatDTO) {
    const errors = await validate(updateChat);
    if (errors.length) {
      throw new HttpException(
        { message: 'Chat input is invalid', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, name: newName } = updateChat;
    const existing = await this.chatRepository.findOneBy({ name: newName });
    if (existing !== null) {
      throw new HttpException(
        { message: 'Chat with such name already exists' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updated = await this.chatRepository.update({ id }, { name: newName });
    if (!updated.affected) {
      throw new HttpException(
        { message: 'Chat not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteOne(id: number) {
    await this.chatRepository.delete(id);
  }

  async deleteByName(name: string) {
    await this.chatRepository.delete({ name });
  }
}
