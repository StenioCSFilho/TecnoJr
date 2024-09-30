import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: './database/sqlite.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
