import express from 'express';
import { StudentRouters } from '../module/students/student.router';
import { UserRouter } from '../module/user/user.router';
import { AcademicSemesterRouter } from '../module/academicSemester/acasemicSemester.router';
import { AcademicFacultyRouter } from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../module/academicDepartment/academicDepartments.route';
import { FacultyRouter } from '../module/Faculty/faculty.router';
import { CourseRouter } from '../module/Course/course.router';

const router=express.Router();

const modelRouter=[
    {path:'/students',route:StudentRouters},
    {path:'/user',route:UserRouter},
    {path:'/academic-semester',route:AcademicSemesterRouter},
    {path:'/academic-faculty',route:AcademicFacultyRouter},
    {path:'/academic-department',route:AcademicDepartmentRouter},
    {path:'/faculty',route:FacultyRouter},
    {path:'/courses',route:CourseRouter}

]

modelRouter.forEach(v=>router.use(v.path,v.route));

export default router;