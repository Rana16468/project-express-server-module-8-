import express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { CourseValidation } from './course.zod.validation';
import { CourseController } from './course.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();
router.post('/create-course',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(CourseValidation.createTCourseValidationSchema),CourseController.createCourse);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),CourseController.getAllCourse);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),CourseController.getSingleCourse);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),CourseController.deleteCourse);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(CourseValidation.updateTCourseValidationSchema),CourseController.updateCourse);
router.put('/:courseId/assign-faculties',auth(USER_ROLE.admin,USER_ROLE.superAdmin), validateRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.assignFacultyWithCourse);
router.delete('/:courseId/remove-faculties',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(CourseValidation.createTCourseFacultyValidationSchema),CourseController.removeFacultyWithCourse)
router.get("/:courseId/get-faculty",auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.user,USER_ROLE.faculty),CourseController.getFacultyWithCourse)

export const  CourseRouter=router;