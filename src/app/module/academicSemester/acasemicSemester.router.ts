import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewere/validationRequest';
import { academicSemesterValidation } from './academicSemester.zod.validations';

const router=express.Router();

router.post('/create-academic-semester',validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),AcademicSemesterController.createAcademicSemester);



export const AcademicSemesterRouter=router