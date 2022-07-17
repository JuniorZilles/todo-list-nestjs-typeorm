import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
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

  private buildQueryOr(query: SearchDTO) {
    const itens = [];
    Object.keys(query).forEach((key) => {
      itens.push({ [key]: query[key] });
    });
    return itens;
  }

  async findOne(query: SearchDTO, operator = 'and'): Promise<Entity> {
    const buildedQuery = operator === 'and' ? query : this.buildQueryOr(query);
    const result = await this.repository.findOne({ where: buildedQuery as unknown as FindOptionsWhere<Entity> });
    return result as Entity;
  }

  async remove(id: string): Promise<Entity> {
    const result = await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<Entity> });
    if (result) {
      await this.repository.remove(result);
      return result as Entity;
    }
    return null;
  }

  async update(id: string, dto: DTO): Promise<Entity> {
    const result = await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<Entity> });
    if (result) {
      const newDto = this.repository.create({ ...result, ...dto, id });
      await this.repository.save(newDto);
      return newDto;
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
