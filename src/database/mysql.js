import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql.json';
import models from '../migrations/createTables'


const dbConfig = mysqlConfigs['dev'];
const { usersCreateModel } = models;
const con = mysql.createConnection(dbConfig);

con.connect(() => {
  console.log("db is on")
}

);

export default con;