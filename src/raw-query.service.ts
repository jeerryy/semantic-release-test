import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class RawQueryService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(@InjectConnection() private readonly conn: Connection) {
  }

  /**
   * Raw Query 사용 (이경우는 Cache 적용이 불가능함)
   * @param sql
   */
  async query(sql:string): Promise<any[]> {
    if(this.isOnlySelect(sql)) {
      return this.readQuery(sql);
    } else {
      return this.writeQuery(sql);
    }
  }

  /**
   * SQL문에 수정 CMD가 포함되는지 확인
   * @param sql
   */
  isOnlySelect(sql:string): boolean {
    let isSelect = true;
    const str = sql.toLowerCase();
    const commands = ["insert", "update","delete","create","alter","drop","rename","truncate"];
    commands.some(command => {
      if(str.includes(command)) {
        isSelect = false;
        return isSelect;
      }
    })
    return isSelect;
  }

  /**
   * 조회 쿼리문일 경우 사용 (only SELECT)
   * @param sql
   */
  async readQuery(sql:string): Promise<any[]> {

    const queryRunner = this.conn.createQueryRunner('slave');

    let rows = undefined;
    try {
      rows = await queryRunner.query(sql);
    } catch (err) {
      rows = err;
    } finally {
      await queryRunner.release();
    }

    return rows;
  }

  /**
   * 조작 쿼리문일 경우 사용(INSERT,UPDATE,DELETE, DDL)
   * @param sql
   */
  async writeQuery(sql:string): Promise<any[]> {
    const queryRunner = this.conn.createQueryRunner('master');
    let rows = undefined;

    await queryRunner.startTransaction();
    try {
      rows = await queryRunner.query(sql);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      rows = err;
    } finally {
      await queryRunner.release();
    }

    return rows;
  }
}
