import database from '../database/mysql';
import queries from '../migrations/queriesSql';

const { con } = database;
const { listingPosts, getSingleItemFromPostsPerId, insertIntoPosts } = queries;

function listingAllPosts() {
  return new Promise((resolve, reject) => {
    con.query(listingPosts, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function list(req, res, next) {
  const posts: Array = await listingAllPosts();
  res.status(200).send({ success: true, message: 'A list of all posts', body: posts });
  await next;
};

function createPost() {
  return new Promise((resolve, reject) => {
    con.query(insertIntoPosts, [text,likes,comments], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create(req, res, next) {
  const {
    text,
    likes,
    comments
  }:{
    text: string,
    likes: number,
    comments: number
  } = req.body;
  
  const posts = await createPost();
  
  res.status(201).send({ success: true, message: 'A posts is create', body: posts });
  await next;
};

export default {
  list,
  create
}