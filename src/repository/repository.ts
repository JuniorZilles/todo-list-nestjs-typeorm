import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import PageDto from '../../src/dto/utils/page.dto';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class CustomRepository<Entity, DTO extends DeepPartial<Entity>, SearchDTO extends PageDto> {
  private repository: Repository<Entity>;
  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  async create(dto: DTO): Promise<DTO> {
    const result = this.repository.create(dto);
    await this.repository.save(result);
    return result as unknown as DTO;
  }

  async findOne(id: string): Promise<DTO> {
    const result = await this.repository.findOne({ id } as FindOneOptions<Entity>);
    return result as DTO;
  }

  async remove(id: string): Promise<DTO> {
    const result = await this.repository.findOne({ id } as FindOneOptions<Entity>);
    if (result) {
      await this.repository.remove(result);
      return result as DTO;
    } else {
      return null;
    }
  }

  async update(id: string, dto: DTO): Promise<DTO> {
    const result = await this.repository.findOne({ id } as FindOneOptions<Entity>);
    if (result) {
      const newDto = { ...result, ...dto };
      await this.repository.save(newDto);
      return newDto as DTO;
    } else {
      return null;
    }
  }

  async findAll(payload: SearchDTO): Promise<Pagination<DTO>> {
    const { page, limit, order, ...search } = payload;
    const docs = await paginate<Entity>(
      this.repository,
      { page, limit },
      {
        where: search,
        address: order
      } as unknown as FindManyOptions<Entity>
    );
    return docs as unknown as Pagination<DTO>;
  }
}
