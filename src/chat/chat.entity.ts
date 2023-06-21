import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';

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
