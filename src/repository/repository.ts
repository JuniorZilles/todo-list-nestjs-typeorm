import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import PageDto from '../dto/utils/page.dto';

export default class CustomRepository<Entity, DTO extends DeepPartial<Entity>, SearchDTO extends PageDto> {
  private repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  async create(dto: DTO): Promise<Entity> {
    const result = this.repository.create(dto);
    await this.repository.save(result);
    return result as Entity;
  }

  async findOne(query: SearchDTO): Promise<Entity> {
    const result = await this.repository.findOne({ where: query as unknown as FindOptionsWhere<Entity> });
    return result as Entity;
  }

  async remove(id: string): Promise<Entity> {
    const result = await this.repository.findOne({ id } as FindOneOptions<Entity>);
    if (result) {
      await this.repository.remove(result);
      return result as Entity;
    }
    return null;
  }

  async update(id: string, dto: DTO): Promise<Entity> {
    const result = await this.repository.findOne({ id } as FindOneOptions<Entity>);
    if (result) {
      const newDto = { ...result, ...dto };
      await this.repository.save(newDto);
      return newDto as Entity;
    }
    return null;
  }

  async findAll(payload: SearchDTO): Promise<Pagination<Entity>> {
    const { page, limit, ...search } = payload;
    const docs = await paginate<Entity>(this.repository, { page, limit }, {
      where: search
    } as unknown as FindManyOptions<Entity>);
    return docs as Pagination<Entity>;
  }
}
