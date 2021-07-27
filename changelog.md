# Changelog

## Frontend

- Create initial filestructure
- Create html for pages:
  - index
  - dashboard
  - profile
- Add dynamic habit description to add habit form

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
- Methods allowing user to change their name, email and password
- Patch method to auth.js file for password change requested by user
- updatePassword method in User model
- updateDetails method in User model which changes email and name
- Extra patch request in user.js controller to allow user to change name/email
- Corrected syntax error in Primary Key in the table "users"
- Corrected path error in Docker-Compose, so it works now
- Extra patch request in auth.js controller to allow user to change password

[2.0.0] - 2021-07-27 - Poligera & Ridwan Axmed
### Added
- Updated dependencies in package.json
- Extra table "completions" for habit tracking
- Fixed syntax error in migrations.sql
- Added seed data for "completions" table
- Fixed a typo in Habit model (module.exports)
- Added missing module.exports for Router
- Added "completionDates" property to Habit model (an array of unix timestamps, in seconds) complete with an extra db query to extract those values from "completions" table based on habit_id foreign key
- 



### Testing
- Created test suite for habit end routes 
- Created test database
- 

## Misc
