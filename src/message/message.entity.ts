import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { Chat } from 'src/chat/chat.entity';

@Entity({ name: 'chat_message' })
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Chat)
  chat: Chat;

  @ManyToOne(() => User)
  author: User;

  @Column({ type: 'varchar', length: 500 })
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
