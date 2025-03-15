import express from "express"
import { singleUpload } from "../multer/multer.js";
import getDataUri from "../utils/uri/dataUri.js";
import cloudinary from "../utils/cloudinary/cloudinary.js";

const router = express.Router();

router.route("/upload-video").post(singleUpload, async(req,res)=>{
  try {
    const file = req.file
    const fileUri = getDataUri(file)

    const result = await cloudinary.uploader.upload(fileUri,{
      resource_type: "auto"
    })
    
    return res.status(200).json({
      success : true,
      message: "Video uploaded successfully.",
      data : result
 
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to upload video.",
      error
    })
  }
})

export default router;