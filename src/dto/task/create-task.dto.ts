import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import DateIsFutureValidator from '../../validators/futureDate.validator';

export default class CreateTaskDto {
  @ApiProperty({
    description: 'Task Identifier',
    required: false,
    readOnly: true
  })
  id?: string;

  @ApiProperty({
    description: 'Task description',
    required: true,
    example: 'Go to the park with Penny'
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date of the task',
    required: true,
    example: '2022-12-24 03:20:00'
  })
  @IsNotEmpty()
  @IsString()
  @Validate(DateIsFutureValidator)
  date: string | Date;

  @ApiProperty({
    description: 'User Task Reference',
    required: true,
    example: '123'
  })
  @IsNotEmpty()
  @IsString()
  user: string;
}
