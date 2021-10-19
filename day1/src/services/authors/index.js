// *********************** ALL THE ENDPOINTS DEDICATED TO authors ************************

// *********************** authors CRUD **************************************************

// 1. CREATE --> POST http://localhost:3001/authors (+ body)
// 2. READ --> GET http://localhost:3001/authors (+ optional Query Parameters)
// 3. READ --> GET http://localhost:3001/authors/:studentId
// 4. UPDATE --> PUT http://localhost:3001/authors/:studentId (+ body)
// 5. DELETE --> DELETE http://localhost:3001/authors/:studentId

import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)

const authorsRouter = express.Router() // a Router is a set of endpoints that share something like a prefix (authorsRouter is going to share /authors as a prefix)

// ********************* how to find out the path *************
// 1. I'll start from the current file I'm in right now (C://......./authors/index.js) and I'll get the path to that file
const currentFilePath = fileURLToPath(import.meta.url)
// 2. I'll get the parent folder's path
const parentFolderPath = dirname(currentFilePath)
// 3. I can concatenate the parent's folder path with authors.json --> "C:\Strive\FullStack\2021\Aug21\M5\
//strive-m5-d2-aug21\src\services\authors\authors.json"
const authorsJSON = join(parentFolderPath, "books.json") // DO NOT EVER USE '+' TO CONCATENATE TWO PATHS, USE JOIN INSTEAD




// 2.
authorsRouter.get("/", (req, res) => {
 

 
  const fileContent = fs.readFileSync(authorsJSON) 

  console.log(JSON.parse(fileContent))

  const array = JSON.parse(fileContent) 
 
  res.send(array)
})



// 1.
authorsRouter.post("/", (req, res) => {
  // First parameter is relative URL, second parameter is the REQUEST HANDLER

  // 1. Read the request body obtaining the new student's data
  console.log(req.body)

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log(newAuthor)

  // 2. Read the file content obtaining the authors array
  const authors = JSON.parse(fs.readFileSync(authorsJSON))

  // 3. Add new student to the array
  authors.push(newAuthor)

  // 4. Write the array back to the file
  fs.writeFileSync(authorsJSON, JSON.stringify(authors))

  // 5. Send back a proper response

  res.status(201).send({ id: newAuthor.id })
})


// 3.
authorsRouter.get("/:studentId", (req, res) => {
  // 1. Read the content of authors.json file (obtaining an array)

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Find the user by id in the array

  const student = authors.find(s => s.id === req.params.studentId) // in the req.params I need to use the exact same name I have used in the "placeholder" in the URL

  // 3. Send the user as a response

  res.send(student)
})

// 4.
authorsRouter.put("/:studentId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Modify the specified student
  const index = authors.findIndex(student => student.id === req.params.studentId)

  const updatedStudent = { ...authors[index], ...req.body }

  authors[index] = updatedStudent

  // 3. Save the file with updated list of authors
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // 4. Send back a proper response

  res.send(updatedStudent)
})

// 5.
authorsRouter.delete("/:studentId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Filter out the specified student from the array, keeping just the remaining authors
  const remainingauthors = authors.filter(student => student.id !== req.params.studentId) // ! = =

  // 3. Save the remaining authors into authors.json file again
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingauthors))

  // 4. Send back a proper response
  res.status(204).send()
})

// authorsRouter.get("/whatever", (req, res) => {})

export default authorsRouter