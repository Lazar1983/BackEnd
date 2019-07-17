import database from '../database/mysql';
import queries from '../migrations/queriesSql';

const { con } = database;
const { listingPosts, getSingleItemFromPostsPerId, insertIntoPosts, deleteSinglePost, updatePost } = queries;

function listingAllPosts(userId) {
  return new Promise((resolve, reject) => {
    con.query(listingPosts, [Number(userId)], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};



async function list(req, res, next) {
  const { userId }: { userId: string } = req.params;
  const posts: Array = await listingAllPosts(userId);
  res.status(200).send({ success: true, message: 'A list of all posts', body: posts });
  await next;
};

function getOnePost(userId, postId) {
  return new Promise((resolve, reject) => {
  con.query(getSingleItemFromPostsPerId, [Number(userId), Number(postId)], (err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
  });
};

async function get(req, res, next) {
  const { userId, id }: { userId: string, id: string } = req.params;
  const posts: Object = await getOnePost(userId, id);
  res.status(200).send({ success: true, message: 'A one post', body: posts });
  await next;
};


function createPost(userId, text, likes, comments) {
  return new Promise((resolve, reject) => {
    con.query(insertIntoPosts, [userId, text, likes, comments], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create(req, res, next) {
  const { userId }: { userId: string } = req.params;
  const {
    text,
    likes,
    comments
  }:{
    text: ?string,
    likes: ?number,
    comments: ?number
  } = req.body;
  
  const post = await createPost(userId, text, likes, comments);
  
  res.status(201).send({ success: true, message: 'A posts is create', body: {text, likes, comments}});
  await next;
};

function deletePost(userId) {
  return new Promise((resolve, reject) => {
    return con.query(deleteSinglePost, parseInt(userId), (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function del(req, res, next) {
  const { userId }: { userId: string } = req.params;
  try {
    const deleteOnePost : Object  = await deletePost(userId);
    res.status(202).send({ success: true, message: 'Post is deleted'});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message});
  }
  
  await next;
};

function updateSinglePost(text,likes,comments,userId) {
  return new Promise((resolve, reject) => {
    con.query(updatePost, [text,likes,comments,userId], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function update(req, res, next) {
  const { userId }: { userId: string } = req.params;
  const {
    text,
    likes,
    comments
  }:{
    text: string,
    likes: number,
    comments: number
  } = Object.assign({}, req.body);
  const postId = req.body.id;
  
  if (postId) {
    res.status(403).send(`Id ${id} is taken`);
  } else {
    const updatePostPerId = await updateSinglePost(text,likes,comments);
    res.status(204).send({ success: true, message: 'A posts is updated', body: {text,likes,comments}});
  };
  await next;
};



export default {
  list,
  create,
  get,
  del,
  update
}