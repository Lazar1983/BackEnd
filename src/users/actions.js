import database from '../database/mysql';
import queries from '../migrations/queriesSql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { con } = database;

const { 
  updateUserQuery, 
  getUserDataQuery, 
  listUserPostsQuery,
  listEmail,
  userWithEmail,
  listAllPostsFromUsers
  } = queries;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


const getSingleUser = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const listingUsersQuery = 'SELECT * FROM users';
  return con.query(listingUsersQuery, (err, results) => {
    if (err) throw (err)
    const users = results;
    const usersIds = users.map(user => user.id);

    if (usersIds.includes(Number(id))) {
      const querySelectUsersById = 'SELECT * FROM users WHERE id = ?';
    
      return con.query(querySelectUsersById, [Number(id)], (err, results, fields) => {
        if (err) throw (err)
        res.status(200).send(results);
      });
    } else {
      res.status(404).send(`Id ${id} is not valid/exists. :( Please try again :B`);
    }
  });

  await next;
}

function getUserData (id) {
  return new Promise ((resolve, reject) => {
    con.query(getUserDataQuery, [Number(id)], (err, results) => {
      if (err) throw (err)
      resolve(results); //result e sekogas niza
    });
  });
}
 
async function get(req, res, next) {
  const { id }: { id: string } = req.params;
  const users: Array = await getUserData(id);
  res.status(200).send({ success: true, message: 'Data from ', body: users[0] });
  await next;
};



function listingAllPostsFromUser(userId) {
  return new Promise((resolve, reject) => {
    con.query(listAllPostsFromUsers, [Number(userId)], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const listUserPosts = async (req, res, next) => {
  const { userId }: { userId: string } = req.params;
  const posts: Array = await listingAllPostsFromUser(userId);


  let post = [];

  let firstname = posts[0].firstName;
  let email = posts[0].email;
 
  for (let i = 0; i < posts.length; i++) {
    let body = {
    text: posts[i].text,
    likes: posts[i].likes,
    comments: posts[i].comments

  }
    post.push(body);
  }


  res.status(200).send({ success: true, message: 'A list of all posts', body: {firstname, email, post} });
  await next;
}


const list = async(req, res, next) => {
  const listingUsers = 'SELECT * FROM users'
  return con.query(listingUsers, (err, results, fields) => {
    if (err) throw (err);
    res.status(200).send(results);
  });
  await next;
}

function checkEmail(email) {
  return new Promise((resolve, reject) => {
    con.query(listEmail, [String(email)], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};



async function create(req, res, next) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phonenumber
  }: {
    firstName: ?string,
    lastName: ?string,
    username: string,
    email: string,
    password: string,
    phonenumber: string
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const getRounds = bcrypt.getRounds(salt);
  const passHash = bcrypt.hashSync(password,getRounds);

  const emailFromDB = await checkEmail(email);

  const emails = emailFromDB[0];

  let emailExist = {
    email : emails.req.body
  };

  if (emailFromDB === emailExist) {
    res.status(404);
  } else {
    emails.req.body;
  }



  const createAt = new Date(Date.now());
  const addQuery = `INSERT INTO users (firstName, lastName, username, email, phonenumber, password, salt, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  return con.query(addQuery, [firstName, lastName, username, email, phoneUpdate.phonenumber, passHash, salt, createAt], (err, results) => {
    if (err) throw (err)
    console.log(results);
    res.status(201).send({ data: { firstName, lastName, username, email, phonenumber, password }})
  });

  await next;
}

function updateUser(firstName, lastName, username, email, id) {
  return new Promise((resolve, reject) => {
    con.query(updateUserQuery, [firstName, lastName, username, email, id], (err, result) => {
      if (err) throw (err);
      resolve(result);
    });
  });
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const {
    firstName,
    lastName,
    username,
    email,
    password
  }: {
    firstName: ?string,
    lastName: ?string,
    username: ?string,
    email: ?string,
    password: ?string
  } = Object.assign({}, req.body);

  const usersFromDB = await getUserData(id);

  const user = usersFromDB[0];

  let userForUpdate = {
    firstName : '',
    lastName : '',
    username : '',
    email : ''
  }

  if (firstName) {
    userForUpdate.firstName = firstName;
  } else {
    userForUpdate.firstName = user.firstName;
  }
  if (lastName) {
    userForUpdate.lastName = lastName;
  }
  else {
    userForUpdate.lastName = user.lastName;
  }
  if (username) {
    userForUpdate.username = username;
  }
  else {
    userForUpdate.username = user.username;
  }
  if (email) {
    userForUpdate.email = email;
  }
  else {
    userForUpdate.email = user.email;
  }

  if (password && password.length) {
    const salt = bcrypt.genSaltSync(10);
    const getRounds = bcrypt.getRounds(salt);
    const passHash = bcrypt.hashSync(password, getRounds);
  } else {
    res.status(404).send('You must to have password');
  }

  const updateUserPerId = await updateUser(userForUpdate.firstName, userForUpdate.lastName, userForUpdate.username, userForUpdate.email, id);
  res.status(204).send({ success: true, message: 'A user is updated', body: {firstName, lastName, username, email, id}});
  
  await next;
}

async function del(req, res, next) {
  const { id }: { id: string } = req.params;
  const deleteUserByIdQuery = 'DELETE FROM users WHERE id = ?';
  return con.query(deleteUserByIdQuery, parseInt(id), (err, results) => {
    if (err) throw (err)
    res.status(202).send(`Users with id ${id} is removed`);
  });

  await next;
}

function loginUserWithPass (email, password) {
  return new Promise ((resolve, reject) => {
    con.query(userWithEmail, [String(email), String(password)], (err, results) => {
      if (err) {
        reject(err);
      }
    resolve(results);
    });
  });
}

function checkLoginEmailandPass (email, password) {
    const user = results.find(emailObj => emailObj.email === email);
    
    if (results && results.length && user.email) {
      const matchPassword: boolean = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        delete user.password;
        delete user.salt;
        const userId = user.id;
        const token = jwt.sign({ user }, 'aaaa', { expiresIn: '1h'});
        res.status(200).send({message: 'Logged in', token: token});
      } else {
        res.status(403).send('Password is not correct');
      }
    } else {
      res.status(404).send(`User with email ${email} not found!`);
    }
}



async function login (req, res, next) {
  const { email , password }: { email: string, password: string } = req.body;
  try {
    const loginUser : Array = await loginUserWithPass(email, password);
    const checkLogin = await checkLoginEmailandPass (email, password);
  } catch (error) {
    res.status(500).send(`Iternal server error`);
  }
  
  await next;
}







export default {
  create,
  list,
  get,
  del,
  update,
  login,
  getSingleUser,
  listUserPosts
} 

