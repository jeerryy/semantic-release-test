import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Logger } from '@src/logger/logger.service';

/**
 * pipe 의 use cases 입니다.
 * transformation: transform input data to the desired output
 * validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect
 *
 * route handler 에 주입될 body 등을 조정하거나, 유효성 검사 등을 수행할 수 있습니다.
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform {
  private readonly logger: Logger = new Logger(this.constructor.name);
  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug(`${this.constructor.name}.transform() works`);
    return value;
  }
}
