import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'chat_message' })
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Chat)
  chat!: Chat;

  @ManyToOne(() => User)
  author!: User;

  @Column({ type: 'varchar', length: 500 })
  text!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
