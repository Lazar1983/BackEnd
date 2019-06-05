const usersCreateModel = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50),
    email VARCHAR(75)
  )
`;



export default {
  usersCreateModel
}