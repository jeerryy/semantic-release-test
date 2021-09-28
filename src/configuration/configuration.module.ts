import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // .env 에 정의된 환경변수를 application 에서 사용할 수 있도록 설정합니다.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigurationModule {}
