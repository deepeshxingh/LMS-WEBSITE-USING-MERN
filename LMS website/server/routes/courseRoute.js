import express from 'express';
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCourse, getCreatorCourses, getPublishedCourse, editCourse, getCourseById, createLecture, getCourseLecture, editLecture, removeLecture, togglePublishedCourse, deleteCourse } from '../controller/courseController.js';
import {singleUpload} from "../multer/multer.js"

const router = express.Router()

router.route("/").post(isAuthenticated, createCourse)
router.route("/published-courses").get( getPublishedCourse)
router.route("/").get( isAuthenticated, getCreatorCourses)
router.route("/:courseId").put(isAuthenticated ,singleUpload, editCourse )
router.route("/:courseId").get(isAuthenticated, getCourseById ) 
router.route("/:id").delete(isAuthenticated, deleteCourse ) 

// Lecture Routes
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)   
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture)   
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture)   
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture)  

// To toggle published and unpublished
router.route("/:courseId").patch(togglePublishedCourse)

export default router;
