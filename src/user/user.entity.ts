import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'chat_user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
