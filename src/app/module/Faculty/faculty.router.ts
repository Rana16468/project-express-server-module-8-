import express from 'express';
import { FacultyController } from './faculty.controller';


const router=express.Router();

router.get('/',FacultyController.getAllFaculty);
router.get('/:id',FacultyController.getSingleFaculty);
router.delete('/:id',FacultyController.deleteFaculty);
router.patch('/:id',FacultyController.updateFaculty);


export const  FacultyRouter=router;