import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import unless from 'express-unless';
import jwt from 'express-jwt';
import io from 'socket.io';
import http from 'http';

// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

import indexRouter from './index/router';

const app = express();
const server = http.createServer(app);


const port = process.env.PORT || 3004;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

const publicRoutePaths = ['/login', '/sign-up'];
// app.use(jwt({ secret: 'aaaa' }).unless({ path: publicRoutePaths }));

app.use(indexRouter);

app.get('/socket', (req, res) => {
  res.sendFile(__dirname + '/socket.html');
});

const socketIO = io(server);

// socketIO.emit('room2', { sender: '5'});
// socketIO.on('room2', (receivedData) => {
//   console.log('Get status', receivedData);
// });


socketIO.on('connection', (socket) => {
  socket.emit('hi', 'hi i am server sender');
  // socket.on('newdata', (dataFromClient) => {
  //   console.log(dataFromClient);
  // });
  socket.on('hi', (msg) => {
    console.log(msg);
  });
  // console.log('hiiiiiii', socket);
  // socketIO.on('statusnalokal', () => {
  //   socketIO.emit('irishpub', { sender: 6 });
  // });
  // socketIO.on('msg', (msg) => {
  //   // if (msg.includes('Povelete')) {
  //   //   status-=1;
  //   // } else {
  //   //   status+=1;
  //   // }
  // })

})
// socketIO.onconnection(() => {
//   socketIO.emit('room2', { sender: '5'});
// });ss


server.listen(port, () => {
  console.log(`API Server is listening on ${port}`);
});