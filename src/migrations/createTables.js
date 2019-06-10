const usersCreateModel = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL
  )
`;

const postsCreateModel = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    text VARCHAR(400),
    likes INT,
    comments INT,
    PRIMARY KEY (id)
  )
`;



export default {
  usersCreateModel,
  postsCreateModel,
}