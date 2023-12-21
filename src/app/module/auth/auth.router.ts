import express from 'express';
import validateRequest from '../../middlewere/validationRequest';
import { AuthAvalidation } from './auth.zod.validation';
import { LoginUserController } from './auth.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';

const router=express.Router();

router.post('/',validateRequest(AuthAvalidation.loginValidationSchema),LoginUserController.loginUser);
router.post('/change-password',auth(USER_ROLE.admin,USER_ROLE.user,USER_ROLE.faculty),validateRequest(AuthAvalidation.changePasswordValidationSchema),LoginUserController.changePassword)
router.post('/refresh-token',validateRequest(AuthAvalidation.requestTokenValidationSchema),LoginUserController.refreshToken)
router.post('/forget-password',validateRequest(AuthAvalidation.forgetPasswordValidationSchema),LoginUserController.forgetPassword);
router.post('/reset-password',validateRequest(AuthAvalidation.resetPasswordValidationSchema),LoginUserController.resetPassword);
export const LoginUserRouter=router;
