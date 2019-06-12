const insertIntoPosts = 'INSERT INTO posts (text, likes, comments) VALUES (?, ?, ?)';
const getSingleItemFromPostsPerId = 'SELECT * FROM posts WHERE id = ?';
const listingPosts = 'SELECT * FROM posts';
const deleteSinglePost = 'DELETE FROM posts WHERE id = ?'
const updatePost = 'UPDATE posts SET text = ?, likes = ?, comments = ?'

export default {
  insertIntoPosts,
  getSingleItemFromPostsPerId,
  listingPosts,
  deleteSinglePost,
  updatePost
};