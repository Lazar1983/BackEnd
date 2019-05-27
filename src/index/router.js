import { Router } from 'express';
import users from '../users/index';
import posts from '../posts/index';


const indexRouter = Router();

// const actionsPost = posts.actions;

indexRouter.use(users.routes);
indexRouter.use(posts.routes);

export default indexRouter;