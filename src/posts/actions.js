import axios from 'axios';
import configs from '../../config/urls';
import fs from 'fs';

const urlConfig = configs['dev'];

const { posts } = urlConfig;

// const dkajsdl = urlCongig.posts;


// complete below functions
// function for getting one post per id as a object
// const get = async (req, res, next) => {
  // const { id }: { id: string } = req.params;
  // const { likesId }: { likesId: string } = req.params;

  // const { data } = await axios.get(posts);

  // exercise 
  // add way in order to gets single user per id and check does id is valid or not
  // if user id is valid then store data into the storage file, the same as on listing
  
  // put your code below
 

  
  // put your code above 
  // await next;
// }

const get = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  
  const getPosts: Object = await axios.get(posts);
  const { data } = getPosts;

  const post: Object = data.filter(post => post.id.toString() === id); //da filtrira se i da najde spored zadadenoto id od req.params

  const postsIds = data.map(i => i.id.toString()); //za da se pretvori se vo string
  const checkPost: boolean = postsIds.includes(id);

  if (checkPost) {
    const checkFile: boolean = fs.existsSync('localStorage.json');
    if (checkFile) {
      const readStorageFile = fs.readFileSync('localStorage.json');
      const parsedReadStorageData: Array = JSON.parse(readStorageFile);
      parsedReadStorageData.push(...post); //...posts
      
      const writeDataToStorageFile: string = JSON.stringify(parsedReadStorageData, null, 2);  // null, 2
      fs.writeFileSync('localStorage.json', writeDataToStorageFile);
    } else {
      const writeDataToStorageFile: string = JSON.stringify(post, null, 2);
      fs.writeFileSync('localStorage.json', writeDataToStorageFile);
    }
    res.status(200).send(post);
  } else {
    res.status(404).send({ message: `Posts id ${id} is not found`});
  }
  await next;
};

// function for listing posts as an array of objects
const list = async(req, res, next) => {
  const { data } = await axios.get(posts);
  
   
  // missing this one (JSON.stringify(data, null, 2));
  // jsonString = JSON.stringify(value, [, replacer [, space ]]);
  // value -> the js object to conver into a JSON string
  
  // replacer -> a fun that alerts the behaviour of the stingification process,
  // ... or an array of String and Number objs that serve as a whitelist for selecting
  // ... the properties of the values obj to be included in the JSON string
  // if this value is null or not provided, all properies of the obj are included
  // ... in the resulting JSON string

  // space -> a String or Number obj that's used to insert white space into the output
  // ... JSON string for readability purposese.

  const writeDataToStorageFile: string = JSON.stringify(data, null, 2)  
  fs.writeFileSync('localStorage.json', writeDataToStorageFile);

  res.status(200).send(data);
  await next;
}

const create = async (req, res, next) => {
  await next;
}

const update = async (req, res, next) => {
  await next;
}

const del = async (req, res, next) => {
  await next;
};

export default {
  get,
  list,
  del,
  update,
  create,
};
