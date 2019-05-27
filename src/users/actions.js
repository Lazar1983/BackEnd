import urlsConfigs from '../../config/urls';
import axios from 'axios';
import fs from 'fs';
const Y = require("../../config/urls");

// console.log('configs', urlsConfigs['stagin']);
const json = {

}

const urlConfig = urlsConfigs['dev'];

// const users1 = urlConfig.users;

const { users } = urlConfig;
// console.log(users1);
// console.log(users);



const list = async (req, res, next) => {
  const { data } = await axios.get(users);
  const writeDataToStorageFile1: string = JSON.stringify(data, null, 2)  
  fs.writeFileSync('localStorage1.json', writeDataToStorageFile1);

  res.status(200).send(data);

  await next;
};

const get = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  
  const getUsers: Object = await axios.get(users);
  const { data } = getUsers;

  const user: Object = data.filter(user => user.id.toString() === id); //da filtrira se i da najde spored zadadenoto id od req.params

  const userIds = data.map(i => i.id.toString()); //za da se pretvori se vo string
  const checkUser: boolean = userIds.includes(id);

  if (checkUser) {
    const checkFile: boolean = fs.existsSync('localStorage1.json');
    if (checkFile) {
      const readStorageFile1 = fs.readFileSync('localStorage1.json');
      const parsedReadStorageData1: Array = JSON.parse(readStorageFile1);
      parsedReadStorageData1.push(...user); //...posts
      
      const writeDataToStorageFile1: string = JSON.stringify(parsedReadStorageData1, null, 2);  // null, 2
      fs.writeFileSync('localStorage1.json', writeDataToStorageFile1);
    } else {
      const writeDataToStorageFile1: string = JSON.stringify(post, null, 2);
      fs.writeFileSync('localStorage1.json', writeDataToStorageFile1);
    }
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: `User id ${id} is not found`});
  }
  await next;
};




const dev = {
  "arrayTemp": [
    "user", 
    "sdas",
    "Adassa"
  ],
  "users": "https://jsonplaceholder.typicode.com/users",
  "posts": "https://jsonplaceholder.typicode.com/posts",
  "sudents": "codeacademy.mk"
};

// console.log('DEVVVVVVVVV', dev);
// console.log('Url configs', urlsConfigs);
// console.log('config', urlConfig);
const array = ["asdas", "Asdas", "Asdas"]
// const url = "https://jsonplaceholder.typicode.com/users"
// const arr1 = [];
// array.forEach((a) => {
//   a = '44',
//   arr1.push(a);
// })

// console.log('Localy arr', array);


export default {
  list,
  get,
};
