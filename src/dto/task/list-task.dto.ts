import { ApiProperty } from '@nestjs/swagger';
import Task from '../../entities/task/task.entity';
import MetaDto from '../utils/meta.dto';
import CreateTaskDto from './create-task.dto';

export default class ListTaskDto {
  @ApiProperty({
    description: 'List of selected tasks',
    isArray: true,
    type: () => CreateTaskDto
  })
  tasks: Task[];

  @ApiProperty({
    description: 'Pagination information'
  })
  meta: MetaDto;
}
