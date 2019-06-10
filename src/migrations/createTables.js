const usersCreateModel = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL
  )
`;



export default {
  usersCreateModel
}