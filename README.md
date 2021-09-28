# Description

NestJS 기반의 RESTful API template project 입니다.

# Philosophy

새로운 project 가 시작될 때, 개발환경을 설정하는데 소비되는 시간을 줄이고, 표준화된 application 을 만들기 위함힙니다. 개발자 여러분들의 많은 관심과 참여가 필요합니다.

이 외에도 NestJS 기반의 RESTful API 와 micro service 를 위한 template project 도 생성할 예정입니다.

# Getting started

## Run

```bash
# application 을 구동합니다.
yarn start:dev
```

# Configurations

이 application 을 실행하기 위해 필요한 설정입니다.

## `.env.*` files

project root 에 `.env` 파일을 생성하거나 환경변수를 통한 설정이 가능합니다.

|     Name     | Description                                                        |  Default   |
| :----------: | ------------------------------------------------------------------ | :--------: |
|   APP_NAME   | Application 고유 이름입니다. 이 이름은 logging 시 에도 사용됩니다. |   NONAME   |
|   APP_PORT   | 사용할 port                                                        |    3000    |
| APP_TIMEZONE | Date, DateTime 등 data type 에 적용될 timezone 입니다.             | Asia/Seoul |

## configuration

Environment variables 설정입니다.

자세한 내용은 [여기](./src/configuration/README.md)를 참조하세요.

## database

Database 설정입니다.

자세한 내용은 [여기](./src/database/README.md)를 참조하세요.

## graphql

RESTful API 설정입니다.

자세한 내용은 [여기](./src/graphql/README.md)를 참조하세요.

## logger

Log 처리 설정입니다.

자세한 내용은 [여기](./src/logger/README.md)를 참조하세요.

# Modules

Business layer 를 여기에 구현하면 됩니다.

자세한 내용은 [sample](./src/modules/sample) 을 참조하세요.

# Stay in touch

문의나 제안은 언제나 환영입니다.

Slack **@Yobi**
