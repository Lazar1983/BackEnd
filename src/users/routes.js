import { Router } from 'express';
import actions from './actions';

const { create, list } = actions;

const userRouter = Router();
userRouter.post('/users', create);
userRouter.get('/users', list);

export default userRouter; 