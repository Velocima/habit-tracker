# Habitude

[Live site](https://habitudeapp.netlify.app/)

The simple way to build habits that last.

## Installation & Usage

### Installation

- Clone or download the repository.
- Open terminal and navigate to `habit-tracker` folder (repository root directory)
- For the server and database dev environments run `bash _script/startDev.sh`
- Navigate to `client` folder and run `npm install` to install dependencies for the client

### Usage

- Open terminal and navigate to `client` folder and run `npm run dev`
- In the browser, go to `http://localhost:8080/` for the client.
- To make requests directly to the server, use api root `http://localhost:3000/`

### Teardown

- Open Terminal and navigate to the repository root directory
- To stop the containers run `bash _script/stop.sh`
- For a complete teardown run `bash _script/teardown.sh`

## Technologies

<details>
  <summary><b>Client</b></summary>
  
  - HTML
  - CSS
  - JavaScript
  - [NPM](https://www.npmjs.com/)
    - [lite-server](https://www.npmjs.com/package/lite-server)
    - [concurrently](https://www.npmjs.com/package/concurrently)
    - [watchify](https://www.npmjs.com/package/watchify)
    - [jest](https://www.npmjs.com/package/jest)
    - [jwt-decode](https://www.npmjs.com/package/jwt-decode)

</details>

<details>
  <summary><b>Server</b></summary>

- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
  - [express](https://www.npmjs.com/package/express)
  - [cors](https://www.npmjs.com/package/cors)
  - [morgan](https://www.npmjs.com/package/morgan)
  - [dayjs](https://www.npmjs.com/package/dayjs)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [pg](https://www.npmjs.com/package/pg)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [jest](https://www.npmjs.com/package/jest)
  - [supertest](https://www.npmjs.com/package/supertest)
  - [nodemon](https://www.npmjs.com/package/nodemon)

</details>

<details>
  <summary><b>Database</b></summary>

- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

</details>

## API endpoints

| Route name | Path                                            | Method        | Purpose                            |
| ---------- | ----------------------------------------------- | ------------- | ---------------------------------- |
| create     | `/auth/register`                                | `POST`        | Register a new account             |
| update     | `/auth/login`                                   | `POST`        | Login to an account                |
| update     | `/auth/:email/password`                         | `PATCH`       | Update account password            |
| show       | `/user/:email`                                  | `GET`         | Get user info                      |
| update     | `/user/:email`                                  | `PATCH`/`PUT` | Update user name                   |
| show       | `/user/:email/habit`                            | `GET`         | Get all users' habits              |
| create     | `/user/:email/habit/`                           | `POST`        | Add a new habit                    |
| show       | `/user/:email/habit/:id`                        | `GET`         | Get a single habit by id           |
| destroy    | `/user/:email/habit/:id`                        | `DELETE`      | Delete a single habit by id        |
| create     | `/user/:email/habit/:id/complete`               | `POST`        | Add a habit completion instance    |
| destroy    | `/user/:email/habit/:id/complete/:completionId` | `DELETE`      | Delete a habit completion instance |

## Changelog

[changelog](./changelog.md)

## Bugs

- [ ] Does not authenticate user token ownership

## Future Features

- Leaderboards
- More habit infographics
- Edit existing habits
