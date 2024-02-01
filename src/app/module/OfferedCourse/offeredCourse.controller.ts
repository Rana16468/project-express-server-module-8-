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



const getAllOfferedCourses:RequestHandler = catchAsync(async (req, res) => {
    const result = await OfferedCourseService.getAllOfferedCoursesFromDB(
      req.query
    );
  
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourses retrieved successfully !',
      meta: result.meta,
      data: result.result,
    });
  });

  const getSingleOfferedCourses:RequestHandler = catchAsync(
    async (req, res) => {
      const { id } = req.params;
      const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id);
  
     sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse fetched successfully',
        data: result,
      });
    },
  );

  const getMyOfferedCourses:RequestHandler=catchAsync(async(req,res)=>{

   const {userId}=req.user;
  
   const result=await OfferedCourseService. getMyOfferedCoursesFromDB(userId,req.query);
   
   sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse fetched successfully',
    meta:result.meta,
    data: result.result,
  });



    
  })


export const OfferedCourseController={
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    getMyOfferedCourses
    
}