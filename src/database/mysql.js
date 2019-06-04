import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql';
import models from '../migrations/createTables';
import { userInfo } from 'os';


const dbConfig = mysqlConfigs['dev'];
const { usersCreateModel } = models;
const con = mysql.createConnection(dbConfig);

con.connect(() => {
  console.log('db connection is on');
  con.query(usersCreateModel);
});

export default con;