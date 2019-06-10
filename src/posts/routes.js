import { Router } from 'express';
import actions from './actions';

const postRouter = Router();
const { list, create } = actions;

postRouter.get('/posts', list);
postRouter.post('/posts', create);

export default postRouter;