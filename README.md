# 2nd-portfolio-project - Habit Tracker

## Full stack web application with an HTML/CSS/JS client and an Express server connected to <db type> database.

A basic habit tracking app

## Technologies

### Client

- HTML
- JavaScript
- CSS
- NPM
  - Jest
  - lite-server
  - watchify (bundler)
  - concurrently
  - jwt_decode

### Backend

- Docker
- NodeJs
- Express
- NPM
  - express
  - cors
  - morgan
  - jsonwebtoken
  - bcrypt
  - pg
  - dotenv (review)
  - cross-env (review)
  - jest
  - supertest
  - uuid

### Database

- Docker
- PostgreSQL

## API endpoints

| Route name | Path                                            | Method        | Purpose     |
| ---------- | ----------------------------------------------- | ------------- | ----------- |
| create     | `/auth/register`                                | `POST`        | Working     |
| update     | `/auth/login`                                   | `POST`        | Working     |
| update     | `/auth/:email/password`                         | `PATCH`       | Working     |
| show       | `/user/:email`                                  | `GET`         | Working     |
| update     | `/user/:email`                                  | `PATCH`/`PUT` | Working     |
| show       | `/user/:email/habit`                            | `GET`         | Working     |
| create     | `/user/:email/habit/`                           | `POST`        | Working     |
| show       | `/user/:email/habit/:id`                        | `GET`         | Working     |
| destroy    | `/user/:email/habit/:id`                        | `DELETE`      | Working     |
| show       | `/user/:email/habit/:id/complete`               | `GET`         | In Progress |
| create     | `/user/:email/habit/:id/complete`               | `POST`        | Working     |
| destroy    | `/user/:email/habit/:id/complete/:completionId` | `DELETE`      | Working     |
| show       | `/user/:email/habit/:id/complete/streaks`       | `GET`         | In Progress |

## Changelog

[changelog](./changelog.md)
