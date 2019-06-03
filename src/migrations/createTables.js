const usersCreateModel = `
  CREATE TABLE if not exists new (
    id INT NOT NULL,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50),
    email VARCHAR(75)
  )
`;

// const

export default {
  usersCreateModel
}