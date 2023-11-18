import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will called controller
router.post('/create-student', StudentControllers.createStudent);
router.get('/getAllStudent', StudentControllers.getAllStudents);

export const StudentRouters = router;
