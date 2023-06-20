import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { Chat } from 'src/chat/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Chat)
  @JoinTable()
  chat: Chat;

  @ManyToOne(() => User)
  author: User;

  @Column({ type: 'varchar', length: 500 })
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
