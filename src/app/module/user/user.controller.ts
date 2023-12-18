import {  RequestHandler } from "express";
import { UserService } from "./user.services";
import httpStatus from "http-status";
import sendRespone from "../../utility/sendRespone";
import catchAsync from "../../utility/catchAsync";





const createStudent:RequestHandler = catchAsync(async (req, res) => {
 
  
  const {password,student} = req.body;

  const result=await UserService.createStudentIntoDb(password,student);

  sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Create Student Suucessfully',data:result})

});

const createFaculty:RequestHandler=catchAsync(async(req,res)=>{

 const {password,faculty} = req.body;
 const result=await UserService.createFacultyIntoDb(password,faculty);
 sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Faculty Created',data:result});

});

const createAdmin:RequestHandler=catchAsync(async(req,res)=>{

  const {password,admin}=req.body;
  const result=await UserService.createAdminIntoDB(password,admin);
  sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Admin Created',data:result});

})

  export const UserController={
    createStudent,
    createFaculty,
    createAdmin
  }
  