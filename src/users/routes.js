import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update } = actions;
 
const userRouter = Router();
userRouter.post('/users', create);
userRouter.get('/users', list);
userRouter.get('/users/:id', get);
userRouter.delete('/users/:id', del);
userRouter.put('/users/:id', update);

export default userRouter;