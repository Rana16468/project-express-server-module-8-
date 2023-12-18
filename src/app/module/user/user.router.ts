import express from 'express';
import { UserController } from './user.controller';


import { studentValidations } from '../students/student.zod.validation';
import validateRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from '../Faculty/faculty.zod.validation';
import { AdminValidation } from '../AdminUser/admin.zod.validation';
import auth from '../../middlewere/auth';
import { USER_ROLE } from './user.constant';



const router=express.Router();
router.post('/create-student',auth(USER_ROLE.admin),validateRequest(studentValidations.createstudentValidationSchema),UserController.createStudent);
router.post('/create-faculty',auth(USER_ROLE.admin),validateRequest(FacultyValidation.createTFacultySchema),UserController.createFaculty);
router.post('/create-admin',/*auth(USER_ROLE.admin),*/validateRequest(AdminValidation.createTAdminSchema),UserController.createAdmin)

export  const UserRouter=router;