import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import database from './database/mysql.js';
import indexRouter from './index/router';
import { Promise } from 'bluebird';

const app = express();
const port = process.env.PORT || 3004;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.use(indexRouter);

app.listen(port, () => {
  console.log(`API Server is listening on ${port}`);
});