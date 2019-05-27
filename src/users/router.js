import { Router } from 'express';
import users from './actions';

const userRouter = Router();
// console.log(users);

userRouter.get('/users', users.list)
userRouter.get('/users/:id', users.get);

// way 2
// import express from 'express';
// const userRo = express.Router();

// userRouter.get('/users', async function get(req, res, next) {
//   await next;
// })

export default userRouter;