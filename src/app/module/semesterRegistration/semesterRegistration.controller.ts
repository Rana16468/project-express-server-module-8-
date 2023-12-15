import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { SemesterRegistrationService } from "./semesterRegistration.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const createSemesterRegistration:RequestHandler=catchAsync(async(req,res)=>{


    const data=req.body;
    const result=await SemesterRegistrationService.createSemesterRegistrationIntoDb(data);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:'Successfully Created Semester Registration', data:result})

});
const getAllSemesterRegistration:RequestHandler=catchAsync(async(req,res)=>{

const data=req.query;
const result=await SemesterRegistrationService.getAllSemesterRegistrationFromDb(data);
sendRespone(res,{success:true,statusCode:httpStatus.OK,message:' Reactrive  Semester Registration Successfully', data:result})
});
const getSingleSemesterRegistration:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:' Reactrive Single  Semester Registration Successfully', data:result})
});

const updateSemesterRegistration:RequestHandler=catchAsync(async(req,res)=>{

const {id}=req.params;
const result=await SemesterRegistrationService.updateSemesterRegistrationFromDb(id,req.body);
sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Update  Semester Registration Successfully', data:result})
});

export const SemesterRegistrationController={
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}