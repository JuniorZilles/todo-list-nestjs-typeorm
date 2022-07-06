import { ApiProperty } from '@nestjs/swagger';
import MetaDto from '../utils/meta.dto';
import CreateTaskDto from './create-task.dto';

export default class ListTaskDto {
  @ApiProperty({
    description: 'List of selected tasks',
    isArray: true,
    type: () => CreateTaskDto
  })
  tasks: CreateTaskDto[];

  @ApiProperty({
    description: 'Pagination information'
  })
  meta: MetaDto;
}
