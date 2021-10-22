//libraries
import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from 'cors'
import { join } from "path"


//import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./errorHandlers.js"

//routing
// import filesRouter from "./services/files/index.js"

import authorsRouter from "./services/authors/index.js"
import blogPostsRouter from './services/blogPosts/index.js'

const server = express()
const publicFolderPath = join(process.cwd(), "./public")


const authorizationMiddleware = (req, res, next) => {
  if (true) {
    next()
  } else {
    res.status(401).send({ message: "YOU ARE NOT AUTHORIZED!" })
  }
}

server.use(express.static(publicFolderPath))

server.use(authorizationMiddleware)

server.use(cors())
server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED

// ************************ ENDPOINTS **********************
server.use('/blogPosts', blogPostsRouter)

server.use("/books", authorsRouter) 

// server.use("/files", filesRouter)


const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})