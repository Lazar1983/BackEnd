import { Router } from 'express';
import actions from './actions';

const postRouter = Router();

const { 
  list, 
  create, 
  get, 
  del, 
  update
} = actions;

postRouter.get('/users/:userId/posts', list);
postRouter.get('/users/:userId/posts/:id', get);
postRouter.post('/users/:userId/posts', create);
postRouter.delete('/users/:userId/posts/:id', del)
postRouter.put('/users/:userId/posts/:id', update);

export default postRouter;