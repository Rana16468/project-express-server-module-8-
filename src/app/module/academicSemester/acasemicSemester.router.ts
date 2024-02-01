import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewere/validationRequest';
import { academicSemesterValidation } from './academicSemester.zod.validations';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/create-academic-semester',auth('admin','superAdmin'),validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),AcademicSemesterController.createAcademicSemester);
router.get(
    '/',
    auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.user,USER_ROLE.superAdmin),
    AcademicSemesterController.getAllAcademicSemesters,
  );
  //https://github.com/Apollo-Level2-Web-Dev/L2B2-PH-university-server/blob/main/src/app/modules/User/user.service.ts
  // patch
  //specific get
  // delete 


export const AcademicSemesterRouter=router