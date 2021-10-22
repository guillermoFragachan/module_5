

import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)
import {uploadFile} from '../files/index.js'
import multer from "multer"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSON = join(parentFolderPath, "books.json") 


//2ja5b7fskuy5cjqi


authorsRouter.get("/", (req, res) => {
 

 
  const fileContent = fs.readFileSync(authorsJSON) 

  console.log(JSON.parse(fileContent))

  const array = JSON.parse(fileContent) 
 
  res.send(array)
})



authorsRouter.post("/", (req, res) => {

  console.log(req.body)

  const newAuthor = { ...req.body, id: uniqid() }
  console.log(newAuthor)

  const authors = JSON.parse(fs.readFileSync(authorsJSON))

  authors.push(newAuthor)

  fs.writeFileSync(authorsJSON, JSON.stringify(authors))


  res.status(201).send({ id: newAuthor.id })
})


authorsRouter.get("/:authorId", (req, res) => {

  const authors = JSON.parse(fs.readFileSync(authorsJSON))


  const author = authors.find(s => s.id === req.params.authorId)
  console.log(author)

  res.send(author)
})

authorsRouter.put("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSON))

  const index = authors.findIndex(student => student.id === req.params.authorId)

  const updatedStudent = { ...authors[index], ...req.body }

  authors[index] = updatedStudent

  fs.writeFileSync(authorsJSON, JSON.stringify(authors))

  res.send(updatedStudent)
})


authorsRouter.delete("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSON))

  const remainingauthors = authors.filter(student => student.id !== req.params.authorId) // ! = =

  fs.writeFileSync(authorsJSON, JSON.stringify(remainingauthors))

  res.status(204).send()
})


authorsRouter.put(
  "/:id/avatar",
  multer().single("avatar"),
  uploadFile,
  async (req, res, next) => {
    try {
      const fileAsBuffer = fs.readFileSync(authorsJSON);

      const fileAsString = fileAsBuffer.toString();

      let fileAsJSONArray = JSON.parse(fileAsString);

      const authorIndex = fileAsJSONArray.findIndex(
        (author) => author.id === req.params.id
      );
      console.log(authorIndex)
      if (authorIndex === -1) {
        res
          .status(404)
          .send({ message: `Author with ${req.params.id} is not found!` });
      }
      const previousAuthorData = fileAsJSONArray[authorIndex];
      const changedAuthor = {
        ...previousAuthorData,
        avatar: req.file,
        updatedAt: new Date(),
        id: req.params.id,
      };
      fileAsJSONArray[authorIndex] = changedAuthor;
      fs.writeFileSync(authorsJSON, JSON.stringify(fileAsJSONArray));
      res.send(changedAuthor);
    } catch (error) {
      res.send(500);
    }
  }
);

export default authorsRouter