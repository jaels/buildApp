DROP TABLE IF EXISTS buildings;
CREATE TABLE buildings (
    id SERIAL primary key,
    address VARCHAR(255) not null,
    placeId VARCHAR(255) not null,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL primary key,
    firstname VARCHAR(255) not null,
    lastname VARCHAR(255) not null,
    floor INTEGER not null,
    building_specifications VARCHAR(255),
    apt_number VARCHAR(255),
    building_id INTEGER not null,
    address VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(255) not null,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);
