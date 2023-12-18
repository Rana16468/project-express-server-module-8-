import express from 'express';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewere/auth';
import { USER_ROLE } from '../user/user.constant';


const router=express.Router();

router.get('/',auth(USER_ROLE.admin,USER_ROLE.faculty),FacultyController.getAllFaculty);
router.get('/:id',FacultyController.getSingleFaculty);
router.delete('/:id',FacultyController.deleteFaculty);
router.patch('/:id',FacultyController.updateFaculty);


export const  FacultyRouter=router;