import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  Query,
  HttpCode,
  Put,
  HttpStatus
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import ListTaskDto from '../../dto/task/list-task.dto';
import SearchTaskDto from '../../dto/task/search-task.dto';
import TaskService from '../../service/task/task.service';
import CreateTaskDto from '../../dto/task/create-task.dto';
import BadRequestErrorDto from '../../dto/utils/bad-request.dto';
import ErrorDto from '../../dto/utils/error.dto';

@ApiTags('task')
@Controller({ path: '/task', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
@ApiBadRequestResponse({ description: 'Bad Request.', type: BadRequestErrorDto })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error.', type: ErrorDto })
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The task was created.', type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.taskService.create(createTaskDto);
    return result;
  }

  @Get()
  @ApiOkResponse({ description: 'Operation succeeded.', type: ListTaskDto })
  async findAll(@Query() payload: SearchTaskDto) {
    const result = await this.taskService.findAll(payload);
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Operation succeeded.', type: CreateTaskDto })
  @ApiNotFoundResponse({ description: 'Searched task was not found.', type: ErrorDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.taskService.findOne(id);
    return result;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Operation succeeded.', type: CreateTaskDto })
  @ApiNotFoundResponse({ description: 'Searched task was not found.', type: ErrorDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: CreateTaskDto) {
    const result = await this.taskService.update(id, updateTaskDto);
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Success on removing the task.' })
  @ApiNotFoundResponse({ description: 'Searched task was not found.', type: ErrorDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.taskService.remove(id);
    return result;
  }
}
