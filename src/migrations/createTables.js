const usersCreateModel = `
  CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phonenumber VARCHAR (30) NOT NULL,
    salt VARCHAR(255),
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    lastSignIn DATE,
    PRIMARY KEY (id)
  )
`;

const postsCreateModel = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userId INT(11),
    text VARCHAR(400),
    likes INT,
    comments INT,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users (id)
  )
`;

const messageCreateModel = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    messageId INT(11),
    text VARCHAR(400),
    textSize INT(11),
    PRIMARY KEY (id),
    FOREIGN KEY (messageId) REFERENCES users (id)
  )
`;


export default {
  usersCreateModel,
  postsCreateModel,
  messageCreateModel
}


