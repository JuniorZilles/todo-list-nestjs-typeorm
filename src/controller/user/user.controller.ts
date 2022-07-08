import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import SearchUserDto from '../../dto/user/search-user.dto';
import UserService from '../../service/user/user.service';
import CreateUserDto from '../../dto/user/create-user.dto';
import ListUserDto from '../../dto/user/list-user.dto';
import ErrorDto from '../../dto/utils/error.dto';
import BadRequestErrorDto from '../../dto/utils/bad-request.dto';

@ApiTags('user')
@Controller({ path: '/user', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
@ApiBadRequestResponse({ description: 'Bad Request.', type: BadRequestErrorDto })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error.', type: ErrorDto })
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'The user was created.', type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Get()
  @ApiQuery({ type: SearchUserDto })
  @ApiOkResponse({ description: 'Operation succeeded.', type: ListUserDto })
  async findAll(@Query() payload: SearchUserDto) {
    const result = await this.userService.findAll(payload);
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Operation succeeded.', type: CreateUserDto })
  @ApiNotFoundResponse({ description: 'Searched user was not found.', type: ErrorDto })
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne(id);
    return result;
  }

  @Put(':id')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ description: 'Operation succeeded.', type: CreateUserDto })
  @ApiNotFoundResponse({ description: 'Searched user was not found.', type: ErrorDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: CreateUserDto) {
    const result = await this.userService.update(id, updateUserDto);
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Success on removing the user.' })
  @ApiNotFoundResponse({ description: 'Searched user was not found.', type: ErrorDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.remove(id);
    return result;
  }
}
