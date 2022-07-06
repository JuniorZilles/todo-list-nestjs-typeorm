import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { toDate, toStringDate } from '../../utils/date.transform';

export default class User {
  @ApiProperty({
    description: 'Person Identifier'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Person Name',
    example: 'João Silva'
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Person CPF',
    format: 'XXX.XXX.XXX-XX',
    required: true,
    example: '756.829.180-45'
  })
  @Column({ nullable: false, unique: true })
  cpf: string;

  @ApiProperty({
    description: 'Person birthday',
    required: true,
    format: 'DD/MM/YYYY',
    example: '14/11/1994',
    type: String
  })
  @Column({
    nullable: false,
    type: 'date',
    transformer: { to: (value: string) => toDate(value), from: (value: Date) => value }
  })
  @Transform(({ value }) => toStringDate(value))
  birthday: string | Date;

  @ApiProperty({
    description: 'Person email',
    format: 'email',
    example: 'user@domain.com',
    type: String
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({
    description: 'Person address',
    required: true,
    example: 'Street A, 4'
  })
  @Column({ nullable: false })
  address: string;

  @ApiProperty({
    description: 'Person city',
    required: true,
    type: String,
    example: 'Dois Irmãos'
  })
  @Column({ nullable: false })
  city: string;

  @ApiProperty({
    description: 'Person state',
    required: true,
    type: String,
    example: 'Rio Grande do Sul'
  })
  @Column({ nullable: false })
  state: string;

  @ApiProperty({
    description: 'Person country',
    required: true,
    type: String,
    example: 'Brasil'
  })
  @Column({ nullable: false })
  country: string;

  @ApiProperty({
    description: 'Person zipCode',
    required: true,
    type: String,
    example: '93950-000'
  })
  @Column({ nullable: false })
  zipCode: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
