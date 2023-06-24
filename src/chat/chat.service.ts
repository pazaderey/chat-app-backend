import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities';
import { Repository, In } from 'typeorm';
import { CreateChatDTO } from './dto';
import { User } from 'src/user/entities';
import { validate } from 'class-validator';

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

  async getByUser(userId: number): Promise<Chat[]> {
    const result = await this.chatRepository.manager.query(
      `SELECT "c"."id", "c"."name", "c"."created_at", MAX("m"."created_at") as "last"
      FROM "chat_message" "m"
      JOIN "chat" "c" ON "c"."id" = "m"."chatId"
      JOIN "chat_users_chat_user" "cu" ON "cu"."chatId" = "c"."id"
      WHERE "cu"."chatUserId" = ${userId}
      GROUP BY "c"."id", "c"."name", "c"."created_at"
      ORDER BY "last" DESC;`,
    );

    return result.map((r) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { last: _, ...chat } = r;
      return chat;
    });
  }
}
