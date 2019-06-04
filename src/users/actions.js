import database from '../database/mysql';
const { con } = database;

 const list = async(req, res, next) => {
  const listingUsers = 'SELECT * FROM mzt.users'
  return con.query(listingUsers, (err, results, fields) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results);
  });
  await next;
}
async function create(req, res, next) {
  const {
    id,
    firstName,
    lastName,
    username,
    email
  }: {
    id: number,
    firstName: ?string,
    lastName: ?string,
    username: string,
    email: string
  } = req.body;

   const addQuery = `INSERT INTO users VALUES (?, ?, ?, ?, ?)`;
  // const queryAdd = `INSERT INTO users VALUES (${id}, ${firstName}, ${lastName}, ${username}, ${email})`;

   return con.query(addQuery, [id, firstName, lastName, username, email], (err, results) => {
    if (err) {
      console.error(err);
    }
    res.status(201).send({ data: { id, firstName, lastName, username, email }})
  });

   await next;
}
export default {
  create,
  list
} 