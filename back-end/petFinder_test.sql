
-- DROPS THE DATABASE IF ALREADY EXISTS IN POSTGRES 
DROP DATABASE IF EXISTS petfinder_test_db;

-- CREATES A DATABASE 
CREATE DATABASE petfinder_test_db;

-- CONNECT WITH DATABASE 
\c petfinder_test_db;

-- CREATES USER TABLE WITH COLUM OF: 
--     - username
--     - password
--     - first_name
--     - last_name
--     - email
--     - phone
--     - is_admin

CREATE TABLE users
(
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
    phone TEXT,
    is_admin BOOLEAN NOT NULL DEFAULT false
);


-- ADD VALUES TO THE USERS TABLE 

INSERT INTO users
( username, password, first_name, last_name, email, phone )
VALUES
('imran', '123456', 'ahmad', 'popal', 'test@yahoo.com', '000-000-0000'),
('parwaiz', '123456', 'ahmad', 'popal', 'test@yahoo.com', '000-000-0000'),
('naweed', '123456', 'ahmad', 'popal', 'test@yahoo.com', '000-000-0000'),
('ajmal', '123456', 'ahmad', 'popal', 'test@yahoo.com', '000-000-0000');
