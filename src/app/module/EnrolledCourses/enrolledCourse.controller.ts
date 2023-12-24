import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import { EnrolledCourseService } from "./enrolledCourse.services";


const createEnrolledCourse:RequestHandler=catchAsync(async(req,res)=>{


const userId=req?.user?.userId
const result=await EnrolledCourseService.createEnrolledCourseIntoDb(userId,req.body);
sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:'Successfully Created Offered Course',data:result
  })

});

const  updateEnrollmentCourseMarks:RequestHandler=catchAsync(async(req,res)=>{
    const {userId}=req.user;
const result=await EnrolledCourseService.updateEnrollmentCourseMarksIntoDb(userId,req.body);
sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Successfully UpdateOffered Course',data:result
  })





});

export const EnrolledCourseController={
    createEnrolledCourse,
    updateEnrollmentCourseMarks
}