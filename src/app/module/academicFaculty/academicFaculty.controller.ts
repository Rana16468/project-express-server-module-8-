import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const createAcademicFaculty=catchAsync(async(req:Request,res:Response)=>{



    const data=req.body;
    const result=await AcademicFacultyService.createAcademicFacultyIntoDb(data);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Create Academic Faculty',data:result})

});
const getAllAcademicFaculties=catchAsync(async(req:Request,res:Response)=>{


    const result=await AcademicFacultyService.getAllAcademicFacultiesFormDb();
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find All Academic Faculty',data:result})
});

const getSingleAcademicFaculties=catchAsync(async(req:Request,res:Response)=>{

    const {facultyId}=req.params;
    
    const result=await AcademicFacultyService.getSingleAcademicFacultyFormDB(facultyId);
 sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find All Academic Faculty',data:result})
 sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully single Academic Faculty',data:result})
});

export const AcademicFacultyController={
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculties
}


