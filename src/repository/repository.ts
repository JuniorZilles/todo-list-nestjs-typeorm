import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

export default class CustomRepository<N, T extends DeepPartial<N>> {
  private repository: Repository<N>;
  constructor(repository: Repository<N>) {
    this.repository = repository;
  }

  async create(dto: T): Promise<T> {
    const result = this.repository.create(dto);
    await this.repository.save(result);
    return result as T;
  }

  async findOne(id: string): Promise<T> {
    const result = await this.repository.findOne({ id } as FindOneOptions<N>);
    return result as T;
  }

  async remove(id: string): Promise<T> {
    const result = await this.repository.findOne({ id } as FindOneOptions<N>);
    if (result) {
      await this.repository.remove(result);
      return result as T;
    } else {
      return null;
    }
  }

  async update(id: string, dto: T): Promise<T> {
    const result = await this.repository.findOne({ id } as FindOneOptions<N>);
    if (result) {
      const newDto = { ...result, ...dto };
      await this.repository.save(newDto);
      return newDto as T;
    } else {
      return null;
    }
  }
}
