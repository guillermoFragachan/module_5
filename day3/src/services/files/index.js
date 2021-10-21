import express from "express"
import multer from "multer"

import { saveBlogpostPictures } from "./lib.js"

const filesRouter = express.Router()

filesRouter.post("/uploadSingle", multer().single("profilePic"), async (req, res, next) => {
  try {
    console.log(req.file)
    await saveBlogpostPictures(req.file.originalname, req.file.buffer)

    res.send("ok")
  } catch (error) {
    next(error)
  }
})



export default filesRouter