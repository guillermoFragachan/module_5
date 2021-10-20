//libraries
import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from 'cors'
//routing
import authorsRouter from "./services/authors/index.js"
import blogPostsRouter from './services/blogPosts/index.js'

const server = express()


server.use(cors())
server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED

// ************************ ENDPOINTS **********************
server.use('/blogPosts', blogPostsRouter)

server.use("/books", authorsRouter) // all of the endpoints which are in the authorsRouter will have /students as a prefix

const port = 3001

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})