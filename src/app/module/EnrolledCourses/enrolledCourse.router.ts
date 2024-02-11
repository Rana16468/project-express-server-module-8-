

import express from 'express';
import auth from '../../middlewere/auth';
import validateRequest from '../../middlewere/validationRequest';
import { EnrolledCourseValidation } from './enrolledCourse.zod.validations';
import { EnrolledCourseController } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';


const router=express.Router();
router.post('/create-enrolled-course',auth(USER_ROLE.user),validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),EnrolledCourseController.createEnrolledCourse);
router.patch(
    '/update-enrolled-course-marks',
    auth(USER_ROLE.faculty,USER_ROLE.admin,USER_ROLE.superAdmin),
   validateRequest(EnrolledCourseValidation.updateEnrolledCourseMarksValidationZodSchema),EnrolledCourseController.updateEnrollmentCourseMarks
   
  );
  router.get(
    '/my-enrolled-courses',
    auth(USER_ROLE.user),
    EnrolledCourseController.getMyEnrolledCourses,
  );

  router.get(
    '/',
    auth(USER_ROLE.faculty),
   EnrolledCourseController.getAllEnrolledCourses,
  );


export const EnrolledCourseRouter=router;