/* eslint-disable no-undef */
import {  RequestHandler } from 'express';
import { StudentServices } from './student.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';
import catchAsync from '../../utility/catchAsync';
//import studentSchema from './student.validation';




// find One 



const specigicStudent= catchAsync(async(req,res)=>{

    const {studentId}=req.params;
  
    const result=await StudentServices.specificStudentFromDb(studentId);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find Specific Student',data:result});
  })

const deleteStudent:RequestHandler=catchAsync(async(req,res)=>{

    const {studentId}=req.params;
      const result=await StudentServices.deleteStudentFormDb(studentId);
      sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Deleted Student',data:result})
  
  
  
  
})

//get all student
const getAllStudents:RequestHandler = catchAsync(async (req, res) => {


  const data=req.query
 
  //QueryString.ParsedQs
    const result = await StudentServices.getAllStudentFormDb(data);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find  Student',data:result})
 
  
});

//updateStudent

const updateStudent=catchAsync(async(req,res)=>{

  const {studentId}=req.params;
  const { student}=req.body;
  const result=await StudentServices.updateStudentIntoDb(studentId,student);
  sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Update ',data:result})
 

  


});

export const StudentControllers = {
  getAllStudents,
  specigicStudent,
  deleteStudent,
  updateStudent
};
