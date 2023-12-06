import express from 'express';
import { UserController } from './user.controller';


import { studentValidations } from '../students/student.zod.validation';
import validateRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from '../Faculty/faculty.zod.validation';

const router=express.Router();
router.post('/create-student',validateRequest(studentValidations.createstudentValidationSchema),UserController.createStudent);
router.post('/create-faculty',validateRequest(FacultyValidation.createTFacultySchema),UserController.createFaculty);
export  const UserRouter=router;