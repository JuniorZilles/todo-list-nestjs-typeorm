import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { toDate } from '../../utils/date.transform';
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
    transformer: { to: (value: string) => toDate(value), from: (value: Date) => value }
  })
  date: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

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
