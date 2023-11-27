import express from 'express';
import { StudentRouters } from '../module/students/student.router';
import { UserRouter } from '../module/user/user.router';

const router=express.Router();

const modelRouter=[
    {path:'/students',route:StudentRouters},
    {path:'/user',route:UserRouter}
]

modelRouter.forEach(v=>router.use(v.path,v.route));

export default router;