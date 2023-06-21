import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';

@Entity()
@Unique(['name'])
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 30 })
  name!: string;

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
