<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Buit with NestJS, A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the backend component to handle various endpoints for a reward management database

## Project Structure
```graphql 
src/
├── rewards/
│   ├── dto/
│   │   └── redeem-reward.dto.ts        # Request body validation
│   ├── schemas/
│   │   ├── user.schema.ts              # User model
│   │   ├── reward-transaction.schema.ts# Transaction model
│   │   └── reward-option.schema.ts     # Reward options model
|   |   └── redemptions_model.ts        # Reward Redemption Model
│   ├── rewards.controller.ts           # API routes
│   ├── rewards.service.ts              # Business logic
│   └── rewards.module.ts               # Rewards module
├── app.module.ts                       # Root module
└── main.ts                             # App bootstrap & Swagger setup

```
## Architecture Overview 
<ul>Modular Design: Rewards functionality is isolated in a dedicated module</ul>
<ul>MongoDB Integration: Mongoose schemas for users, transactions, and reward options.</ul>
<ul>DTO Validation: Request bodies are validated using class-validator.</ul>
<ul>Service Layer: Handles business logic, including point checking and transaction recording.</ul>
<ul>Controller Layer: Handles HTTP requests and responses.</ul>
<ul>Swagger: Auto-generated API docs.</ul>
<ul>Jest: Handles Unit Tests</ul>

## Project setup

```bash
$ npm install
```
And set mongo uri in app.module.ts

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## View API Documentation and Sample Requests and Responses
<br> Hit URI/api  to view Swagger documnentation <br>
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.




