const insertIntoPosts = 'INSERT INTO posts (userId, text, likes, comments) VALUES (?, ?, ?, ?)';
const getSingleItemFromPostsPerId = 'SELECT * FROM posts WHERE userId = ? AND id = ?';
const listingPosts = 'SELECT * FROM posts WHERE id = ?';
const deleteSinglePost = 'DELETE FROM posts WHERE id = ?';
const updatePost = 'UPDATE posts SET text = ?, likes = ?, comments = ?';
const updateUserQuery = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?';
const innerJoin = 'SELECT users.id, posts.id, text, likes, firstName, lastName FROM users AS Users INNER JOIN posts AS Posts ON Users.id = Posts.userId';
const getUserDataQuery = 'SELECT * FROM users WHERE id=?';
const listUserPostsQuery = 'SELECT * FROM posts WHERE userId = ?;';
const listEmail = 'SELECT * FROM users WHERE email = ?;';
const listingMessage = 'SELECT * FROM messages WHERE id=?';
const insertIntoMessage ='INSERT INTO messages (messageId, text, textSize) VALUES (?, ?, ?)';
const getSingleMessage = 'SELECT * FROM messages WHERE userId = ? AND messageId = ?'
const userWithEmail = 'SELECT * FROM users WHERE email = ?';
const listAllPostsFromUsers = 'SELECT * FROM users JOIN posts ON users.id = posts.userId WHERE userId = ?'

export default {
  insertIntoPosts,
  getSingleItemFromPostsPerId,
  listingPosts,
  deleteSinglePost,
  updatePost,
  updateUserQuery,
  getUserDataQuery,
  listUserPostsQuery,
  listEmail,
  userWithEmail,
  listAllPostsFromUsers

};