import database from '../database/mysql';
const { con } = database;

const get = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  // const id = req.params.id;
  const listingUsersQuery = 'SELECT * FROM users';
  // let usersIds;
  return con.query(listingUsersQuery, (err, results) => {
    if (err) {
      console.error(err);
    }
    const users = results;
    const usersIds = users.map(user => user.id);

    if (usersIds.includes(Number(id))) {
      const querySelectUsersById = 'SELECT * FROM users WHERE id = ?';
    
      return con.query(querySelectUsersById, [Number(id)], (err, results, fields) => {
        if (err) {
          console.error(err);
        }
        res.status(200).send(results);
      });
    } else {
      res.status(404).send(`Id ${id} is not valid/exists. :( Please try again :B`);
    }
  });

  await next;
}

 const list = async(req, res, next) => {
  const listingUsers = 'SELECT * FROM users'
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

  // const username = req.body.username;
  const listingUsersQuery = 'SELECT * FROM users';
  return con.query(listingUsersQuery, (err, results) => {
    if (err) {
      console.error(err);
    }
    const users = results;
    const usersIds = users.map(user => user.id);
    // id = 7;
    // [1, 2, 3, 4, 5, 6].includes(5)
    if (usersIds.includes(Number(id))) {
      res.status(400).send(`Id ${id} is already taken`);
    } else {
      const addQuery = `INSERT INTO users VALUES (?, ?, ?, ?, ?)`
      return con.query(addQuery, [id, firstName, lastName, username, email], (err, results) => {
        if (err) {
          console.error(err);
        }
        res.status(201).send({ data: { id, firstName, lastName, username, email }})
      });
    }
  })

   await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const {
    firstName,
    lastName,
    username,
    email
  }: {
    firstName: ?string,
    lastName: ?string,
    username: string,
    email: string
  } = Object.assign({}, req.body);
  const userId = req.body.id;
  if (userId) {
    res.status(403).send(`Id ${id} should not be overwritten`);
  } else {
    const updateUserQuery = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?'
    return con.query(updateUserQuery, [firstName, lastName, username, email, Number(id)], (err, results) => {
      if (err) {
        console.error(err);
      }
      res.status(204).send(results);
    });
  }
  await next;
}

//diff between function and arrow fun
//what is local scope, what is global scope
// diff between local and global scope

async function del(req, res, next) {
  const { id }: { id: string } = req.params;
  const deleteUserByIdQuery = 'DELETE FROM users WHERE id = ?';
  return con.query(deleteUserByIdQuery, parseInt(id), (err, results) => {
    if (err) {
      console.error(err);
    }
    res.status(202).send(`Users with id ${id} is removed`);
  });

  await next;
}

export default {
  create,
  list,
  get,
  del,
  update
} 