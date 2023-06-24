import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name!: string;

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
