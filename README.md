
# TODO API NestJS and TypeORM

This is repository to train me to use nestjs and typeorm. The task consist on create a todo list application

## Info

[![GitHub issues](https://img.shields.io/github/issues/JuniorZilles/todo-list-nestjs-typeorm.svg)](https://GitHub.com/JuniorZilles/todo-list-nestjs-typeorm/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/JuniorZilles/todo-list-nestjs-typeorm.svg)](https://GitHub.com/JuniorZilles/todo-list-nestjs-typeorm/pull/)
[![GitHub contributors](https://img.shields.io/github/contributors/JuniorZilles/todo-list-nestjs-typeorm.svg)](https://GitHub.com/JuniorZilles/todo-list-nestjs-typeorm/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/JuniorZilles/todo-list-nestjs-typeorm.svg)](https://github.com/JuniorZilles/todo-list-nestjs-typeorm/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/JuniorZilles/todo-list-nestjs-typeorm.svg)](https://GitHub.com/JuniorZilles/todo-list-nestjs-typeorm/releases/)
![](http://img.shields.io/static/v1?label=Node&message=14.18.1&color=green&style=for-the-badge&logo=node.js)
![](http://img.shields.io/static/v1?label=NestJS&message=8.0.0&color=ed2945&style=for-the-badge&logo=nestjs)
![](http://img.shields.io/static/v1?label=eslint&message=8.0.1&color=4B32C3&style=for-the-badge&logo=eslint)
![](http://img.shields.io/static/v1?label=Typescript&message=4.3.5&color=blue&style=for-the-badge&logo=typescript)
![](http://img.shields.io/static/v1?label=mysql&message=8.0.27&color=blue&style=for-the-badge&logo=MYSQL)
![](http://img.shields.io/static/v1?label=STATUS&message=DONE&color=GREEN&style=for-the-badge)
## Variáveis de Ambiente

To run this project, you will need to add the following environment variables to your .env

`TYPEORM_HOST`

`TYPEORM_USERNAME`

`TYPEORM_PASSWORD`

`TYPEORM_DATABASE`

`TYPEORM_PORT`

`TYPEORM_MIGRATIONS`

`NODE_ENV`

`PORT`
## Running locally

Clone the project

```bash
  git clone https://github.com/JuniorZilles/todo-list-nestjs-typeorm
```

Enter the project directory

```bash
  cd todo-list-nestjs-typeorm
```

Install the dependencies

```bash
  $ yarn
```

Start the server

```bash
  # development
  $ yarn start

  # watch mode
  $ yarn start:dev

  # production mode
  $ yarn start:prod
```


## Running the tests

To run the tests, run the following command

```bash
  # Integration
  $ yarn test

  # e2e (depends on a running database)
  $ yarn test:e2e
```


## Deploy on docker

To deploy this project on docker with docker-compose, run

```bash
  docker-compose up -d
```


## Access Documentation While Running

[Documentation](http://localhost:3000/docs-api)


## Reference

 - [NestJS](https://docs.nestjs.com/)
 - [TypeORM](https://typeorm.io/)


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@JuniorZilles](https://github.com/JuniorZilles)

