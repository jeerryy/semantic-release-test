import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Logger } from '@src/logger/logger.service';
import { SampleService } from '@src/modules/sample/sample.service';
import { CustomValidationPipe } from '@src/pipes/validation/custom-validation-pipe.service';

@Controller('sample')
export class SampleController {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getSample(@Query('id') id: string) {
    this.sampleService.hello();
    return id || 'It works';
  }

  @Get('raw')
  getRawSample() {
    return this.sampleService.rawHello();
  }

  @Get('exception')
  makeException() {
    this.logger.debug(`makeException`);
    throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get(':id')
  getSampleWithPathVariable(@Param('id') id: string) {
    return id;
  }

  @Post()
  @UsePipes(new CustomValidationPipe())
  postSample(@Body() body: any) {
    this.logger.debug(`post sample`);
    this.logger.debug(body);
    return body;
  }

  @Put()
  putSample(@Body() body: any) {
    this.logger.debug(`put sample`);
    return body;
  }

  @Patch()
  patchSample(@Body() body: any) {
    this.logger.debug(`patch sample`);
    return body;
  }

  @Delete()
  deleteSample() {
    this.logger.debug(`delete sample`);
  }
}
