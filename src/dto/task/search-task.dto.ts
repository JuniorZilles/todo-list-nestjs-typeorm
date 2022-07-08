import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import PageDto from '../utils/page.dto';

export default class SearchTaskDto extends PageDto {
  @ApiProperty({
    description: 'Task description',
    required: false,
    example: 'Go to the park with Penny',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({
    description: 'Date of the task',
    required: false,
    example: '2022-12-24 03:20:00',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  date?: string;

  @ApiProperty({
    description: 'User Task Reference',
    required: false,
    example: '123',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  user?: string;
}
