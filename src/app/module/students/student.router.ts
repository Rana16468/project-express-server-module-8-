import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewere/validationRequest';
import { studentValidations } from './student.zod.validation';
import auth from '../../middlewere/auth';

const router = express.Router();

//will called controller
router.get('/getAllStudent',auth('user','admin','faculty','superAdmin'), StudentControllers.getAllStudents);
router.delete('/getAllStudent/:studentId',auth('admin','superAdmin'), StudentControllers.deleteStudent);
router.get('/specificStuden/:studentId', auth('user','admin','faculty','superAdmin'),StudentControllers.specigicStudent);
router.patch('/update-student/:studentId',auth('admin','superAdmin'),validateRequest(studentValidations.UpdateStudentValidationSchema) ,StudentControllers.updateStudent);

export const StudentRouters = router;
