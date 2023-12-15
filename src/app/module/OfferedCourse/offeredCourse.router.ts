import express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.zod.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router=express.Router();

router.post('/',validateRequest(OfferedCourseValidation.createTOfferedCourseValidation),OfferedCourseController.createOfferedCourse);
router.patch('/:id',validateRequest(OfferedCourseValidation.updateTOfferedCourseValidation),OfferedCourseController.updateOfferedCourse);
export const OfferedCourseRouter=router;