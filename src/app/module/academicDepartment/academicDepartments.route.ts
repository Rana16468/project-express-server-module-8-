import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewere/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.zod.validation';


const route=express.Router();
route.post('/create-AcademicDepartment',validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),AcademicDepartmentController.createAcademicDepartment);
route.get('/all-AcademicDepartment',AcademicDepartmentController.getAllAcademicDepartment);
route.get('/single-AcademicDepartMent/:depertmentId',AcademicDepartmentController.getSingleAcademicDeaprtment);
route.patch('/update-AcademicDepartment/:depertmentId',AcademicDepartmentController.updateAcademicDepertment);
export const AcademicDepartmentRouter=route;