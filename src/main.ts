import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as moment from 'moment-timezone';
import { Logger } from '@src/logger/logger.service';
import { HttpExceptionFilter } from '@src/filters/exception/exception.filter';
// import * as helmet from 'helmet';
// import * as cookieParser from 'cookie-parser';
// import * as csrf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(process.env.APP_NAME),
  });

  // exception 이 발생했을 때 client 에 동일한 format 의 결과를 전송하기 위하여 filter 를 등록합니다.
  app.useGlobalFilters(new HttpExceptionFilter());

  // security 와 롼련된 내용입니다. xss, csrf 와 관련된 취약점 보완이 필요할 경우 아래를 참조하세요.
  // https://github.com/helmetjs/helmet
  // app.use(helmet());
  // https://github.com/expressjs/cookie-parser#readme
  // app.use(cookieParser());
  // https://github.com/expressjs/csurf#csurf
  // app.use(csrf({ cookie: true }));

  const logger = app.get<Logger, Logger>(Logger);
  const port = process.env.APP_PORT || 3000;

  await app.listen(port, () => {
    logger.setContext('APP');
    logger.log(`Server is listening on :${port}`);
  });
}

(async () => {
  const logger: Logger = new Logger('APP');

  const appTimeZone = process.env.APP_TIMEZONE || 'Asia/Seoul';

  if (moment.tz.zone(appTimeZone) === null) {
    logger.error(`올바르지 않은 APP_TIMEZONE(${appTimeZone}) 입니다.`);
    return;
  }

  moment.tz.setDefault(appTimeZone);

  logger.log(`APP_TIMEZONE 은 ${appTimeZone} 입니다.`);

  await bootstrap();
})();
