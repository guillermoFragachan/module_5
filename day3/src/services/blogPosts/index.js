import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)
import createHttpError from "http-errors"
import {uploadFile} from '../files/index.js'
import multer from "multer"


import expressValidator from "express-validator"
const {validationResult} = expressValidator


const blogPostsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const blogPostsJSON = join(parentFolderPath, "blogPosts.json") 



blogPostsRouter.get("/", (req, res) => {
 

   

    const file = fs.readFileSync(blogPostsJSON)

    const data = JSON.parse(file)
    console.log(file)
    console.log(data)

   
   
    res.send(data)
  })
  

  blogPostsRouter.post('/', (req, res) =>{
    console.log(req.body)

    const newPost = { ...req.body, id: uniqid() }

  const posts = JSON.parse(fs.readFileSync(blogPostsJSON))

  posts.push(newPost)

  fs.writeFileSync(blogPostsJSON, JSON.stringify(posts))


  res.status(201).send({ id: newPost.id })

  })

blogPostsRouter.get('/:postId', (req, res) =>{
    const posts = JSON.parse(fs.readFileSync(blogPostsJSON))


  const post = posts.find(s => s.id === req.params.postId)
  console.log(post)

  res.send(post)
    

})

blogPostsRouter.delete('/:postId', (req, res) =>{



})



blogPostsRouter.put('/:postId', (req, res) =>{



})


//comments

blogPostsRouter.put(
  "/:id/comment",
  async (req, res, next) => {
    try {
      const { text, userName } = req.body;
      const comment = { id: uniqid(), text, userName, createdAt: new Date() };
      const fileAsBuffer = fs.readFileSync(blogPostsJSON);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const blogIndex = fileAsJSONArray.findIndex(
        (blog) => blog.id === req.params.id
      );
      if (!blogIndex == -1) {
        res
          .status(404)
          .send({ message: `blog with ${req.params.id} is not found!` });
      }
      const previousblogData = fileAsJSONArray[blogIndex];
      previousblogData.comments = previousblogData.comments || [];
      const changedblog = {
        ...previousblogData,
        ...req.body,
        comments: [...previousblogData.comments, comment],
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[blogIndex] = changedblog;

      fs.writeFileSync(blogPostsJSON, JSON.stringify(fileAsJSONArray));
      res.send(changedblog);
    } catch (error) {
      console.log(error);
      res.send(500).send({ message: error.message });
    }
  }
);


blogPostsRouter.post(
  "/:id/image",
  multer().single("blogPosts"),
  uploadFile,
  async (req, res, next) => {
    try {
      const fileAsBuffer = fs.readFileSync(blogPostsJSON);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const index = fileAsJSONArray.findIndex(
        (author) => author.id === req.params.id
      );
      console.log(index)
      if (index === -1) {
        res
          .status(404)
          .send({ message: `Author with ${req.params.id} is not found!` });
      }
      const prevDataBlog = fileAsJSONArray[index];
      const newDataBlog = {
        ...prevDataBlog,
        cover: req.file,
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[index] = newDataBlog;
      fs.writeFileSync(blogPostsJSON, JSON.stringify(fileAsJSONArray));
      res.send(newDataBlog);
    } catch (error) {
      res.send(500);
    }
  }
);



export default blogPostsRouter