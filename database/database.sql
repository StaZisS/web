CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    is_active BOOLEAN default false,
    activation_link VARCHAR(255)
);

CREATE TABLE token (
    id_user_token SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    foreign key (id_user_token) references users(id)
);

CREATE TABLE users_info (
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(255) default 'user',
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    age INTEGER,
    address VARCHAR(255),
    mobile VARCHAR(255),
    money INTEGER default 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    id_sender SERIAL,
    if_receiver SERIAL,
    amount INTEGER,
    FOREIGN KEY (id_sender) REFERENCES users_info(user_id),
    FOREIGN KEY (if_receiver) REFERENCES users_info(user_id)
);

/*
SELECT * FROM token;
SELECT * FROM users;

{
    "password" : "nfnfnvfdsfn",
    "email" : "tghkfjrjrjlyfbjrjjfhu@gmail.com"
}

*/