import { Router } from 'express';
import actions from './actions';

const postRouter = Router();
const { list, create, get } = actions;

postRouter.get('/posts', list);
postRouter.get('/posts/:id', get);
postRouter.post('/posts', create);

export default postRouter;