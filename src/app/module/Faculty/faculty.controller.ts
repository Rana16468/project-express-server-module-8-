import { RequestHandler } from "express"
import catchAsync from "../../utility/catchAsync"
import { FacultyService } from "./faculty.server"
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const getAllFaculty:RequestHandler=catchAsync(async(req,res)=>{



    const result=await FacultyService.getAllFacultyIntoDb();
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Find All Faculty Successfully',data:result});


});

const getSingleFaculty:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await FacultyService.getSingleFacultyIntoDb(id);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Find Single Faculty Successfully',data:result});

});

const deleteFaculty:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await FacultyService.deleteFacultyIntoDb(id);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Deleted the  Faculty and User Successfully',data:result});

});

const updateFaculty:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const {faculty}=req.body;
    const result=await FacultyService.updateFacultyIntoDb(id,faculty);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Update Faculty Successfully',data:result});
});



export const FacultyController={
    getAllFaculty,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty
    
}