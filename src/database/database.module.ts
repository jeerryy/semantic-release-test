import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TODO code 로 변경
    TypeOrmModule.forRoot({
      // dbms 유형
      type: 'mysql',
      // repository pattern 사용 시 사용할 entities
      // that glob paths are not supported by webpack
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      /*
      Note, however, that glob paths are not supported by webpack, so if you are building your application within a monorepo, you won't be able to use them.
      To address this issue, an alternative solution is provided.
      To automatically load entities, set the autoLoadEntities property of the configuration object (passed into the forRoot() method) to true
      */
      // autoLoadEntities: true,
      // synchronize: true,
      // TODO production 에서는 false 로 변경해야합니다.
      debug: false,
      // TODO production 에서는 다른값으로 변경해야합니다..
      // logging: 'all',
      logging: ['query', 'info', 'warn', 'error'],
      // logger: 'advanced-console',
      // database 설정을 참조하세요.
      // TODO timezone (Asia/Seoul) 을 아래처럼 offset (+09:00) 으로 변경할 수 있는지 확인해보자.
      timezone: '+09:00',
      // 쓰기 node 와 읽기 node 분리 시 사용합니다.
      replication: {
        master: {
          host: 'localhost',
          port: 3306,
          username: 'root',
          // password: 'root',
          database: 'test',
        },
        slaves: [
          {
            host: 'localhost',
            port: 3307,
            username: 'root',
            // password: 'root',
            database: 'test',
          },
        ],
      },
      // https://github.com/mysqljs/mysql#connection-options
      extra: {
        // The maximum number of connections to create at once. (Default: 10)
        // TODO 이게 적용되는지 확인해봐야합니다.
        connectionLimit: 10,
      },
    }),
  ],
})
export class DatabaseModule {}
