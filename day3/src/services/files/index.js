import path, { dirname, extname } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../../../public");



export const parseFile = multer();

export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    const pathToFile = path.join(publicDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    const link = `http://localhost:3001/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};




// filesRouter.post("/:postId/uploadSingle", multer().single("blogPostImage"), async (req, res, next) => {
//   try {
//     console.log(req.file)
//     await saveBlogpostPictures(req.file.originalname, req.file.buffer)

//     res.send("ok")
//   } catch (error) {
//     next(error)
//   }
// })


// filesRouter.post("/:authorId/uploadAvatar", multer().single("authorAvatar"), async (req, res, next) => {
//     try {
//       console.log(req.file)
//       await saveAvatar(req.file.originalname, req.file.buffer)
  
//       res.send("ok")
      
//         res.send(200);
//     } catch (error) {
//       next(error)
//     }
//   })




// export default filesRouter