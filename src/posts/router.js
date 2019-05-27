import { Router } from 'express';
import posts from './actions';

const postRouter = Router();

// API Methods
postRouter.get('/posts', posts.list);
postRouter.get('/posts/:id', posts.get);
postRouter.put('/posts/:id', posts.update);
postRouter.delete('/posts/:id', posts.del);
postRouter.post('/posts', posts.create);

export default postRouter;