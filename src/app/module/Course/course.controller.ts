import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { CourseService } from "./course.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const createCourse:RequestHandler=catchAsync(async(req,res)=>{

    const data=req.body;
    
    const result=await CourseService.createCourseIntoDb(data);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Create Course Successfully',data:result});


});
const getAllCourse:RequestHandler=catchAsync(async(req,res)=>{

    const result=await CourseService.getAllCourseIntoDb();
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'All Course Find Successfully',data:result});
});

const getSingleCourse:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await CourseService.getSingleCourseIntoDb(id);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Single Course Find Successfully',data:result});
});

const deleteCourse:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await CourseService.deleteCourseFromDb(id);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Delete Course Successfully',data:result});
});
const updateCourse:RequestHandler=catchAsync(async(req,res)=>{


    const {id}=req.params;
    const data=req.body;
    const result=await CourseService.updateCourseIntoDb(id,data);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Update Course Successfully',data:result});
});

//course faculty controller 
const assignFacultyWithCourse:RequestHandler=catchAsync(async(req,res)=>{

    const {courseId}=req.params;
    const {faculties}=req.body;
    const result=await  CourseService.assignFacultyWithCourseIntoDb(courseId,faculties);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Course Faculty Create Successfully',data:result});
});
const removeFacultyWithCourse:RequestHandler=catchAsync(async(req,res)=>{

    const {courseId}=req.params;
    const {faculties}=req.body;
    const result=await CourseService.removeFacultyWithCourseIntoDb(courseId,faculties);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Remove Course Faculty Successfully',data:result});

});

export const CourseController={
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultyWithCourse,
    removeFacultyWithCourse
}