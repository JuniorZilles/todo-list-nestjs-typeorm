import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import PageDto from '../utils/page.dto';

export default class SearchTaskDto extends PageDto {
  @ApiProperty({
    description: 'Task description',
    required: true,
    example: 'Go to the park with Penny'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({
    description: 'Date of the task',
    required: true,
    example: '2022-12-24 03:20:00'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  date?: string;

  @ApiProperty({
    description: 'User Task Reference',
    required: true,
    example: '123'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  user?: string;
}
