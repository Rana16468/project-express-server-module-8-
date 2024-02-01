import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewere/validationRequest';
import { TAcademicFacultyValidation } from './academicFaculty.zod.validation';
import auth from '../../middlewere/auth';

const route=express.Router();


route.post('/create-AcademicFaculty',auth('superAdmin','admin'),validateRequest(TAcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyController.createAcademicFaculty);
route.get('/single-AcademicFaculty/:facultyId',AcademicFacultyController.getSingleAcademicFaculties);
route.get('/all-AcademicFaculty',AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRouter=route;
