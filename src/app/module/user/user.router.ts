import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';


import { studentValidations } from '../students/student.zod.validation';
import validateRequest from '../../middlewere/validationRequest';
import { FacultyValidation } from '../Faculty/faculty.zod.validation';
import { AdminValidation } from '../AdminUser/admin.zod.validation';
import auth from '../../middlewere/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utility/sendImageToCloudinary';



const router=express.Router();
router.post('/create-student',auth(USER_ROLE.admin),
upload.single('file'),

(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data)
    next();
},validateRequest(studentValidations.createstudentValidationSchema),UserController.createStudent);
router.post('/create-faculty',auth(USER_ROLE.admin),
upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{
    
    req.body=JSON.parse(req.body.data)
    next();

},
validateRequest(FacultyValidation.createTFacultySchema),UserController.createFaculty);
router.post('/create-admin',auth(USER_ROLE.admin),validateRequest(AdminValidation.createTAdminSchema),UserController.createAdmin)
// get me router
router.get('/me',auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.user),UserController.getMe);
router.post('/change-status/:id',auth(USER_ROLE.admin),validateRequest(UserValidation.chnageStatusValidationSchema),UserController.chnageStatus)

export  const UserRouter=router;