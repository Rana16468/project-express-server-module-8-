
import  express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.zod.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';


const router=express.Router();

router.post('/',validateRequest(SemesterRegistrationValidation.createTSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration);
router.get('/',SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id',validateRequest(SemesterRegistrationValidation.updateTSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration)
export const SemesterRegistrationRouter=router;