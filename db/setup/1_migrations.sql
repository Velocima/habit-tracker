DROP TABLE IF EXISTS users;

CREATE TABLE users (
    email varchar(100) PRIMARY KEY,
    name varchar(100) NOT NULL,
    password_digest varchar(500) NOT NULL
);


DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    email varchar(100) NOT NULL UNIQUE,
    habit_name varchar(255) NOT NULL,
    habit_description varchar(255) NOT NULL,
    habit_frequency varchar(255) NOT NULL,
    frequency_target int NOT NULL,
    FOREIGN KEY(email) REFERENCES users(email)
)


DROP TABLE IF EXISTS completions;

CREATE TABLE completions (
    id serial PRIMARY KEY,
    completion_date bigint,
    habit_id int,
    FOREIGN KEY(habit_id) REFERENCES habits(id)
)