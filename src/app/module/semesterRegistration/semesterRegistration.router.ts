
import  express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.zod.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';


const router=express.Router();

router.post('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(SemesterRegistrationValidation.createTSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.user),SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(SemesterRegistrationValidation.updateTSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration)
// delete router 
export const SemesterRegistrationRouter=router;
