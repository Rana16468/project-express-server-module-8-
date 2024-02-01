import express from 'express';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';


const router=express.Router();

router.get('/',auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.superAdmin),FacultyController.getAllFaculty);
router.get('/:id',auth(USER_ROLE.faculty,USER_ROLE.superAdmin,USER_ROLE.admin),FacultyController.getSingleFaculty);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),FacultyController.deleteFaculty);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),FacultyController.updateFaculty);


export const  FacultyRouter=router;