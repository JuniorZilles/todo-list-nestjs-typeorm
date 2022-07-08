import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import CpfValidator from 'src/validators/cpf.validator';
import DateIsOlderAgeValidator from 'src/validators/age.validator';
import PageDto from '../utils/page.dto';

export default class SearchUserDto extends PageDto {
  @ApiProperty({
    description: 'Person Name',
    required: false,
    example: 'João Silva',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  name?: string;

  @ApiProperty({
    description: 'Person CPF',
    format: 'XXX.XXX.XXX-XX',
    required: false,
    example: '756.829.180-45',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @Validate(CpfValidator)
  cpf?: string;

  @ApiProperty({
    description: 'Person birthday',
    format: 'DD/MM/YYYY',
    required: false,
    example: '14/11/1994',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @Validate(DateIsOlderAgeValidator)
  birthday?: Date;

  @ApiProperty({
    description: 'Person email',
    format: 'email',
    required: false,
    example: 'user@domain.com',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Person address',
    required: false,
    example: 'Street A, 4'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  address?: string;

  @ApiProperty({
    description: 'Person city',
    type: String,
    required: false,
    example: 'Dois Irmãos'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  city?: string;

  @ApiProperty({
    description: 'Person state',
    type: String,
    required: false,
    example: 'Rio Grande do Sul'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Person country',
    type: String,
    required: false,
    example: 'Brasil'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'Person zipCode',
    required: false,
    type: String,
    example: '93950-000'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  zipCode?: string;
}
