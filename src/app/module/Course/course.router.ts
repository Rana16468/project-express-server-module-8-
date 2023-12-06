import express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { CourseValidation } from './course.zod.validation';
import { CourseController } from './course.controller';

const router=express.Router();
router.post('/create-course',validateRequest(CourseValidation.createTCourseValidationSchema),CourseController.createCourse);
router.get('/',CourseController.getAllCourse);
router.get('/:id',CourseController.getSingleCourse);
router.delete('/:id',CourseController.deleteCourse);
router.patch('/:id',validateRequest(CourseValidation.updateTCourseValidationSchema),CourseController.updateCourse);
router.put('/:courseId/assign-faculties', validateRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.assignFacultyWithCourse);
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.removeFacultyWithCourse)
export const  CourseRouter=router;