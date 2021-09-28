import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { LoggerModule } from '@src/logger/logger.module';
import { Logger } from '@src/logger/logger.service';
import { DatabaseModule } from '@src/database/database.module';
import { ConfigurationModule } from '@src/configuration/configuration.module';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, LoggerModule, SampleModule],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule implements OnApplicationBootstrap, OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor() {
    this.logger.debug(`${this.constructor.name} 이 생성되었습니다.`);
  }

  /**
   * 모듈이 초기화된 후 수행해야할 동작이 있다면 여기에 작성하세요.
   */
  onModuleInit(): any {
    this.logger.debug(`onModuleInit 이 호출되었습니다.`);
  }

  /**
   * 모든 modules 가 load 되고 사용할 준비가된 후 수행해야할 동작이 있다면 여기에 작성하세요.
   */
  onApplicationBootstrap(): any {
    this.logger.debug(`onApplicationBootstrap 이 호출되었습니다.`);
  }
}
