# Changelog

## Frontend

## Backend
[1.0.0] - 2021-07-26 - Poligera & Ridwan Axmed
### Added
- PostgreSQL database setup with defined tables (users and habits) and seed data
- Docker-Compose.yaml file
- Models for User and Habit with crud functionality, complete with db queries
- Three controllers - auth, habit and user with full crud functionality and bcrypt salting/hashing
- server.js file to set up the Express server and utilise the controllers
- index.js file that starts the server
- Middleware for jsonwebtoken which verifies validity of the token to authorize user entry
- .env file with SECRET environment variable used with token verification process
- package.json file with aproppriate dependencies


## Misc
