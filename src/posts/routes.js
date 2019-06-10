import { Router } from 'express';
import actions from './actions';

const postRouter = Router();
const { list } = actions;

postRouter.get('/posts', list);

export default postRouter;