DROP TABLE IF EXISTS users;

CREATE TABLE users (
    email PRIMARY KEY varchar(100) NOT NULL UNIQUE,
    name varchar(100) NOT NULL UNIQUE,
    password_digest varchar(500) NOT NULL UNIQUE
);

CREATE TABLE habits (
    id serial PRIMARY KEY,
    email varchar(100) NOT NULL UNIQUE,
    habit_name varchar(255) NOT NULL UNIQUE,
    habit_description varchar(255) NOT NULL UNIQUE,
    habit_frequency varchar(255) NOT NULL UNIQUE,
    frequency_target int NOT NULL UNIQUE,
    streak int NOT NULL UNIQUE
)