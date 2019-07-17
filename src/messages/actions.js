import database from '../database/mysql';
import queries from '../migrations/queriesSql';



const { con } = database;
const { listingMessage, getSingleMessage, insertIntoMessage } = queries;


function listingAllMessages(userId) {
  return new Promise((resolve, reject) => {
    con.query(listingMessage, [Number(userId)], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

async function list(req, res, next) {
  const { userId }: { userId: string } = req.params;
  const messages: Array = await listingAllMessages(userId);
  res.status(200).send({ success: true, message: 'A list of all messages', body: messages });
  await next;
};

function getOneMessage(userId, messageId) {
  return new Promise((resolve, reject) => {
  con.query(getSingleMessage, [Number(userId), Number(messageId)], (err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
  });
};

async function get(req, res, next) {
  const { userId, id }: { userId: string, id: string } = req.params;
  const message: Object = await getOneMessage(userId, id);
  res.status(200).send({ success: true, message: 'A one message', body: message });
  await next;
};


function createMessage(messageId, text, textSize) {
  return new Promise((resolve, reject) => {
    con.query(insertIntoMessage, [messageId, text, textSize], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create(req, res, next) {
  const { userId }: { userId: string } = req.params;
  const {
    messageId,
    text,
    textSize
  }:{
    messageId: ?number,
    text: ?string,
    textSize: ?number
  } = req.body;
  
  const message = await createMessage(messageId, text, textSize);
  
  res.status(201).send({ success: true, message: 'A message is create', body: {messageId, text, textSize}});
  await next;
};






export default {
  list,
  create,
  get
  // del,
  // update
}