import { ApiProperty } from '@nestjs/swagger';
import MetaDto from '../utils/meta.dto';
import CreateUserDto from './create-user.dto';

export default class ListUserDto {
  @ApiProperty({
    description: 'List of selected users',
    isArray: true,
    type: () => CreateUserDto
  })
  users: CreateUserDto[];

  @ApiProperty({
    description: 'Pagination information'
  })
  meta: MetaDto;
}
