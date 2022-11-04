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