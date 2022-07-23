import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { toDate, toStringDate } from '../../utils/date.transform';
import User from '../user/user.entity';

@Entity('task')
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: false,
    type: 'date',
    transformer: { to: (value: string) => toDate(value), from: (value: Date) => toStringDate(value) }
  })
  date: Date;

  @Exclude()
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;

  @Column({ nullable: false })
  userId?: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt?: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
