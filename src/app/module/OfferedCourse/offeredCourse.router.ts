import express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.zod.validation';
import { OfferedCourseController } from './offeredCourse.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewere/auth';

const router=express.Router();

router.get("/my_offered_course",auth(USER_ROLE.user),OfferedCourseController.getMyOfferedCourses);
router.post('/',validateRequest(OfferedCourseValidation.createTOfferedCourseValidation),OfferedCourseController.createOfferedCourse);
router.patch('/:id',validateRequest(OfferedCourseValidation.updateTOfferedCourseValidation),OfferedCourseController.updateOfferedCourse);
router.get('/',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), OfferedCourseController.getAllOfferedCourses );
router.get('/:id', auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty, USER_ROLE.user, ), OfferedCourseController.getSingleOfferedCourses);


export const OfferedCourseRouter=router;