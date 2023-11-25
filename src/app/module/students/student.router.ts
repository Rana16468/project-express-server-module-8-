import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will called controller
router.get('/getAllStudent', StudentControllers.getAllStudents);
router.delete('/getAllStudent/:studentId', StudentControllers.deleteStudent);
router.get('/specificStuden/:studentId',StudentControllers.specigicStudent);

export const StudentRouters = router;
