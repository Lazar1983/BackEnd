import { Router } from 'express';
import users from '../users/index';
import posts from '../posts/index';
import messages from '../messages/index';


const { routes } = users;
const indexRouter = Router();


indexRouter.use(routes);
indexRouter.use(posts.routes);
indexRouter.use(messages.routes);

export default indexRouter;