import { Injectable } from '@nestjs/common';
import { Logger } from '@src/logger/logger.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { RawQueryService } from '@src/raw-query.service';

@Injectable()
export class SampleService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  /**
   * TODO master/slave 구조일 때 아래의 경우 master 를 사용합니다. master / slave 를 선택적으로 사용하려면 queryRunner 를 활용해야합니다.
   * this.connection.createQueryRunner('slave');
   * @param connection
   */
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly rawQuery: RawQueryService
  ) {}

  hello() {
    this.logger.debug(`sample service works`);
    return 'world';
  }

  async rawHello(): Promise<any[]> {
    const idx = Math.floor(Math.random()*50000);
    const rows = this.rawQuery.query(`select * from USER LIMIT ${idx}, 4`);
    return rows;
  }
}
