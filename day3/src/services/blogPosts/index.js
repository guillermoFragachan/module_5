import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)

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
  

  blogPostsRouter.post('/', (req, res, next) =>{
      const newData = {...req, id: uniqid()}

      const posts = JSON.parse(fs.readFileSync(blogPostsJSON))

      res.status(201).send({id:newData.id})

  })





export default blogPostsRouter