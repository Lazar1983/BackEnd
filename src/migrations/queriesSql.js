const insertIntoPosts = 'INSERT INTO posts (userId, text, likes, comments) VALUES (?, ?, ?, ?)';
const getSingleItemFromPostsPerId = 'SELECT * FROM posts WHERE id = ?';
const listingPosts = 'SELECT * FROM posts';
const deleteSinglePost = 'DELETE FROM posts WHERE id = ?';
const updatePost = 'UPDATE posts SET text = ?, likes = ?, comments = ?';
const updateUserQuery = 'UPDATE users SET username = ?, email = ?, password= ?';
const innerJoin = 'SELECT users.id, posts.id, text, likes, firstName, lastName FROM users AS Users INNER JOIN posts AS Posts ON Users.id = Posts.userId';
const getUserDataQuery = 'SELECT * FROM users WHERE id=?';



export default {
  insertIntoPosts,
  getSingleItemFromPostsPerId,
  listingPosts,
  deleteSinglePost,
  updatePost,
  updateUserQuery,
  getUserDataQuery

};