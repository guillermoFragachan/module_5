import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)
import createHttpError from "http-errors"


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



export default blogPostsRouter