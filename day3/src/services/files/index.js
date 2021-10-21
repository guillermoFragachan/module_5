import express from "express"
import multer from "multer"

import { saveBlogpostPictures, saveAvatar } from "./lib.js"

const filesRouter = express.Router()

filesRouter.post("/:postId/uploadSingle", multer().single("blogPostImage"), async (req, res, next) => {
  try {
    console.log(req.file)
    await saveBlogpostPictures(req.file.originalname, req.file.buffer)

    res.send("ok")
  } catch (error) {
    next(error)
  }
})


filesRouter.post("/:authorId/uploadAvatar", multer().single("authorAvatar"), async (req, res, next) => {
    try {
      console.log(req.file)
      await saveAvatar(req.file.originalname, req.file.buffer)
  
      res.send("ok")
    } catch (error) {
      next(error)
    }
  })




export default filesRouter