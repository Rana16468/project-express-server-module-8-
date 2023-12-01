import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewere/validationRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

//will called controller
router.get('/getAllStudent', StudentControllers.getAllStudents);
router.delete('/getAllStudent/:studentId', StudentControllers.deleteStudent);
router.get('/specificStuden/:studentId',StudentControllers.specigicStudent);
router.patch('/update-student/:studentId',validateRequest(studentValidations.UpdateStudentValidationSchema) ,StudentControllers.updateStudent);

export const StudentRouters = router;
