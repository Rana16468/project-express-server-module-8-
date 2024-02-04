import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";

import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import { AcademicDepartmentService } from "./academicDepartment.services";



const createAcademicDepartment=catchAsync(async(req:Request,res:Response)=>{




    const data=req.body;
    
    const result=await AcademicDepartmentService.createAcademicDepartmentIntoDb(data);
       sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'successfully create Academic Department',data:result})

});

const getAllAcademicDepartment=catchAsync(async(req:Request,res:Response)=>{


    const result=await AcademicDepartmentService.getAllAcademicDepertmentFormDb(req.query);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'successfully get All  Academic Department',meta:result.meta,data:result.result});
});

const getSingleAcademicDeaprtment=catchAsync(async(req:Request,res:Response)=>{

    const {depertmentId}=req.params;
    const result=await AcademicDepartmentService.getSingleAcademicDepertmentFormDb(depertmentId);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'successfully get Specific  Academic Department',data:result});
});

const updateAcademicDepertment=catchAsync(async(req:Request,res:Response)=>{

    const {depertmentId}=req.params;
    const data=req.body;

    const result=await AcademicDepartmentService.updateAcademicDepartmentIntoDb(depertmentId,data);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Update successfully get Specific  Academic Department',data:result});




})

export const AcademicDepartmentController={
    createAcademicDepartment,
    getAllAcademicDepartment,
   getSingleAcademicDeaprtment,
   updateAcademicDepertment
}