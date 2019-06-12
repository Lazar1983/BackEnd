import { Router } from 'express';
import actions from './actions';

const postRouter = Router();
const { list, create, get, del, update } = actions;

postRouter.get('/posts', list);
postRouter.get('/posts/:id', get);
postRouter.post('/posts', create);
postRouter.delete('/posts/:id', del);
postRouter.put('/posts/:id', update);

export default postRouter;