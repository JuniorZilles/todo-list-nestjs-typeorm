import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import CpfValidator from 'src/validators/cpf.validator';
import DateIsOlderAgeValidator from 'src/validators/date.validator';
import PageDto from '../utils/page.dto';

export default class SearchUserDto extends PageDto{

  @ApiProperty({
    description: 'Person Name',
    example: 'João Silva'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  name?: string;

  @ApiProperty({
    description: 'Person CPF',
    format: 'XXX.XXX.XXX-XX',
    example: '756.829.180-45'
  })
  @IsOptional()
  @IsNotEmpty()
  @Validate(CpfValidator)
  cpf?: string;

  @ApiProperty({
    description: 'Person birthday',
    format: 'DD/MM/YYYY',
    example: '14/11/1994',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @Validate(DateIsOlderAgeValidator)
  birthday?: string | Date;

  @ApiProperty({
    description: 'Person email',
    format: 'email',
    example: 'user@domain.com',
    type: String
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Person password',
    example: '1sa1d5as1d51d'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password?: string;

  @ApiProperty({
    description: 'Person address',
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
    example: 'Rio Grande do Sul'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Person country',
    type: String,
    example: 'Brasil'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'Person zipCode',
    type: String,
    example: '93950-000'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}
