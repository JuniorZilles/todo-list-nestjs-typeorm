import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import Task from '../../src/entities/task/task.entity';
import User from '../../src/entities/user/user.entity';

export default async (): Promise<void> => {
  ConfigModule.forRoot({
    envFilePath: ['.env.test']
  });
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Task, User],
    logging: false
  });

  await dataSource.initialize();

  const taskRepository = dataSource.getRepository('task');
  const userRepository = dataSource.getRepository('user');
  await taskRepository.query('TRUNCATE TABLE task;');
  await userRepository.query('DELETE FROM user');
  await dataSource.destroy();
};
