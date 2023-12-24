

import express from 'express';
import auth from '../../middlewere/auth';
import validateRequest from '../../middlewere/validationRequest';
import { EnrolledCourseValidation } from './enrolledCourse.zod.validations';
import { EnrolledCourseController } from './enrolledCourse.controller';


const router=express.Router();
router.post('/create-enrolled-course',auth('user'),validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),EnrolledCourseController.createEnrolledCourse);
router.patch(
    '/update-enrolled-course-marks',
    auth('faculty'),
   validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),EnrolledCourseController.updateEnrollmentCourseMarks
   
  );


export const EnrolledCourseRouter=router;