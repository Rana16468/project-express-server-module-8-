import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { OfferedCourseService } from "./offeredCourse.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const createOfferedCourse:RequestHandler=catchAsync(async(req,res)=>{


const data=req.body;
const result=await OfferedCourseService.createOfferedCourseIntoDb(data);
sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Create Offered Course Successfully',data:result});
});

const updateOfferedCourse:RequestHandler=catchAsync(async(req,res)=>{

const {id}=req.params;
const data=req.body;
const result=await OfferedCourseService.updateOfferedCourseIntoDb(id,data);
sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Update Offered Course Successfully',data:result});
});
export const OfferedCourseController={
    createOfferedCourse,
    updateOfferedCourse
}