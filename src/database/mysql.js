import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql';
import models from '../migrations/createTables';


const dbConfig = mysqlConfigs['dev'];
const { usersCreateModel, postsCreateModel, messageCreateModel } = models;
const con = mysql.createConnection(dbConfig);

con.connect(() => {
  console.log('db connection is on');
  con.query(usersCreateModel);
  con.query(postsCreateModel);
  con.query(messageCreateModel);
});

export default {
  con
};