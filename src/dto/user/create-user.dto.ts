import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import CpfValidator from '../../validators/cpf.validator';
import DateIsOlderAgeValidator from '../../validators/age.validator';

export default class CreateUserDto {
  @ApiProperty({
    description: 'Person Identifier',
    required: false,
    readOnly: true
  })
  id?: string;

  @ApiProperty({
    description: 'Person Name',
    required: true,
    example: 'João Silva'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  name: string;

  @ApiProperty({
    description: 'Person CPF',
    format: 'XXX.XXX.XXX-XX',
    required: true,
    example: '756.829.180-45'
  })
  @IsNotEmpty()
  @Validate(CpfValidator)
  cpf: string;

  @ApiProperty({
    description: 'Person birthday',
    required: true,
    format: 'DD/MM/YYYY',
    example: '14/11/1994',
    type: String
  })
  @IsNotEmpty()
  @Validate(DateIsOlderAgeValidator)
  birthday: Date;

  @ApiProperty({
    description: 'Person email',
    required: true,
    format: 'email',
    example: 'user@domain.com',
    type: String
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Person password',
    required: true,
    example: '1sa1d5as1d51d'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Person address',
    required: true,
    example: 'Street A, 4'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  address: string;

  @ApiProperty({
    description: 'Person city',
    required: true,
    type: String,
    example: 'Dois Irmãos'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  city: string;

  @ApiProperty({
    description: 'Person state',
    required: true,
    type: String,
    example: 'Rio Grande do Sul'
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Person country',
    required: true,
    type: String,
    example: 'Brasil'
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Person zipCode',
    required: true,
    type: String,
    example: '93950-000'
  })
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}
