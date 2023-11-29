import express from 'express';
import { UserController } from './user.controller';


import { studentValidations } from '../students/student.zod.validation';
import validateRequest from '../../middlewere/validationRequest';

const router=express.Router();
router.post('/create-student',validateRequest(studentValidations.createstudentValidationSchema),UserController.createStudent);
export  const UserRouter=router;