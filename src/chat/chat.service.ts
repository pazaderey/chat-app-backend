import { validate } from 'class-validator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

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
      throw new BadRequestException({
        message: 'Chat input is invalid',
        errors,
      });
    }

    const { name, users: userIds } = createChat;
    const existing = await this.chatRepository.findOneBy({ name });
    if (existing) {
      throw new UnprocessableEntityException({
        message: 'Chat with such name already exists',
      });
    }
    const chat = CreateChatDTO.toChat(createChat);

    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    chat.users = users;
    const newChat = await this.chatRepository.save(chat);
    return newChat;
  }

  async updateOne(updateChat: UpdateChatDTO) {
    const errors = await validate(updateChat);
    if (errors.length) {
      throw new BadRequestException({
        message: 'Chat input is invalid',
        errors,
      });
    }

    const { id } = updateChat;
    const existing = await this.chatRepository.findOne({
      relations: { users: true },
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException({
        message: 'Chat not found',
      });
    }

    const { name: newName = existing.name } = updateChat;
    const existingName = await this.chatRepository.findOne({
      where: { id: Not(id), name: newName },
    });
    if (existingName) {
      throw new UnprocessableEntityException({
        message: `Chat with name ${newName} already exists`,
      });
    }

    const usersSet = new Set([
      ...(updateChat.users ?? existing.users.map((u) => u.id)),
      ...(updateChat.newUsers ?? []),
    ]);
    const deleteUsersSet = new Set(updateChat.deleteUsers ?? []);

    const userIds = Array.from(
      [...usersSet].filter((i) => !deleteUsersSet.has(i)),
    );

    const updatedChat = UpdateChatDTO.toChat(updateChat, existing);
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    updatedChat.users = users;
    await this.chatRepository.save(updatedChat);
  }

  async deleteOne(id: number) {
    await this.chatRepository.delete(id);
  }

  async deleteByName(name: string) {
    await this.chatRepository.delete({ name });
  }
}
