# build stage
FROM node:14.18-alpine as builder

# 이 option 에 의해 graphql console 을 사용여부가 결정됩니다.
ENV NODE_ENV=development

# /app 을 application root 로 사용합니다.
WORKDIR /app

# npm install 에 필요한 것들만 복사. packge.json, packeg-lock.json
COPY ./package.json ./yarn.lock ./

# 의존성 설치
RUN yarn install --production=false

# build 할 떄 필요한 것들도 복사
COPY ./tsconfig.json ./tsconfig.build.json ./nest-cli.json ./

# source code 복사
COPY ./src ./src

# source code build
RUN yarn build

# 실행 이미지입니다.
FROM node:14.18-alpine

# NODE_ENV 환경변수를 build 시에 설정할 수 있도록 합니다. 기본값은 development 입니다.
ARG NODE_ENV=development

# 이 option 에 의해 graphql playground 을 사용여부가 결정됩니다.
ENV NODE_ENV=$NODE_ENV

# /app 을 application root 로 사용합니다.
WORKDIR /app

# npm install 에 필요한 것들만 복사. packge.json, packeg-lock.json
COPY ./package.json ./yarn.lock ./

RUN apk add --no-cache chromium

# 의존성 설치
RUN yarn install --prod

# build stage 로 부터 build output 복사
COPY --from=builder /app/dist /app/dist

# port
EXPOSE 3000

# 실행
CMD yarn start:prod
