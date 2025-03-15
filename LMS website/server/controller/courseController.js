import { Course } from "../models/courseModel.js";
import getDataUri from "../utils/uri/dataUri.js"
import cloudinary from "../utils/cloudinary/cloudinary.js"
import { Lecture } from "../models/LectureModel.js";
import {User} from "../models/userModel.js"

export const createCourse = async (req, res)=>{
  try {
    const {courseTitle, category} = req.body
    if(!courseTitle || !category){
      return res.status(400).json({
        success : false,
        message: "Please provide course Title and category",
      })
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id
    })
    return res.status(201).json({
      success : true,
      message: "Course created successfully",
      course
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success : false,
      message: "Failed to create course. Please try again",
      error
    })
  }
}

export const getPublishedCourse = async (req,res)=>{
  try {
    const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl description"})
     if(!courses){
       return res.status(404).json({
         success : false,
         message: "No published courses found",
       })
     }
     return res.status(200).json({
       success : true,
       message: "Published courses fetched successfully",
       courses
     })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to get published courses. Please try again",
      error
    })
  }
}

export const getCreatorCourses = async (req,res)=>{
  try {
    const userId = req.id;
    const courses = await Course.find({creator:userId}).populate("lectures")
    if(!courses){
      return res.status(404).json({
        success : false,
        message: "No courses found for this user",
        courses: []
      })
    }
    return res.status(200).json({
      success : true,
      message: "Courses fetched successfully",
      courses
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to get creator courses. Please try again",
      error
    })
  }
}  

export const editCourse = async (req,res)=>{
  try {
    const courseId = req.params.courseId;
    const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body;
    const file = req.file;

    let course = await Course.findById(courseId).populate("lectures")
    if(!course){
      return res.status(404).json({
        success : false,
        message: "Course not found",
      })
    }

    let courseThumbnail;
    if(file){
      const fileUri = getDataUri(file);
      courseThumbnail = await cloudinary.uploader.upload(fileUri)
    }

    const updateData = {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail:courseThumbnail?.secure_url}
    course = await Course.findByIdAndUpdate(courseId, updateData, {new: true})
    return res.status(200).json({
      success : true,
      message: "Course updated successfully",
      course
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to edit course. Please try again",
      error
    })
  }
}

export const getCourseById = async (req,res)=>{
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).json({
        success : false,
        message: "Course not found",
      })
    }
    return res.status(200).json({
      success : true,
      message: "Course fetched successfully",
      course
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to get course by id. Please try again",
      error
    })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Use 'id' to match route parameter
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course. Please try again",
      error,
    });
  }
};




// Lecture Controllers
export const createLecture = async (req,res) =>{
    try {
      const {lectureTitle} = req.body;
      const {courseId} = req.params;

      if(!lectureTitle || !courseId){
        return res.status(400).json({
          success : false,
          message: "Please provide lecture title",
        })
      }

      const lecture = await Lecture.create({lectureTitle})
      const course = await Course.findById(courseId)

      if(course){
        course.lectures.push(lecture._id)
        await course.save();
      }

      return res.status(201).json({
        success : true,
        message: "Lecture created successfully",
        lecture
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success : false,
        message: "Failed to create lecture.",
        error
      })
    }
}

export const getCourseLecture = async (req,res)=>{
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if(!course){
      return res.status(404).json({
        success : false,
        message: "Course not found",
      })
    }

    return res.status(200).json({
      success : true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to get course lectures.",
      error
    })
  }
}

export const editLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { lectureTitle, videoInfo, isPreviewFree } = req.body; // ✅ Extract values from req.body

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // ✅ Update Lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree; // ✅ Ensure boolean values are updated

    await lecture.save();

    // ✅ Ensure the lecture is linked to the course
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit lecture.",
      error,
    });
  }
};


export const removeLecture = async(req,res)=>{
  try {
    const {lectureId} = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if(!lecture){
      return res.status(404).json({
        success : false,
        message: "Lecture not found",
      })
    }

    // Remove the lecture reference from the associated course
    await Course.updateOne(
      {lectures : lectureId},// Find the course that contains the lecture
      {$pull: {lectures:lectureId}} // Remove the lecture if from the lecture arrays
    );
    
    return res.status(200).json({
      success : true,
      message: "Lecture removed successfully",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to remove lecture.",
      error
    })
  }
}

export const togglePublishedCourse = async(req, res)=>{
    try {
      const {courseId} = req.params;
      const {publish} = req.query;
      const course = await Course.findById(courseId);
      if(!course){
        return res.status(404).json({
          success : false,
          message: "Course not found",
        })
      }
      course.isPublished = !course.isPublished
      await course.save();

      const statusMessage = course.isPublished ? "Published" : "Unpublished"
      return res.status(200).json({
        success : true,
        message: `Course has been ${statusMessage} successfully`,
        course
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to toggle course publication status.",
        error,
      });
    }
  }