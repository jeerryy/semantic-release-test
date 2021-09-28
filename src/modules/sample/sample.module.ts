import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { RawQueryService } from '@src/raw-query.service';

@Module({
  controllers: [SampleController],
  providers: [SampleService,RawQueryService]
})
export class SampleModule {}
