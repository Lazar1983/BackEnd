import { Router } from 'express';
import actions from './actions';

const messageRouter = Router();


const { 
  list,
  create, 
  get
  // del, 
  // update
} = actions;

messageRouter.get('/users/:userId/messages', list);
messageRouter.get('/users/:userId/messages/:id', get);
messageRouter.post('/users/:userId/message', create);


export default messageRouter;