import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { Chat } from 'src/chat/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Chat)
  @JoinTable()
  chat: Chat;

  @ManyToOne(() => User)
  author: User;

  @Column()
  text: string;

  @Column()
  created_at: Date;
}
