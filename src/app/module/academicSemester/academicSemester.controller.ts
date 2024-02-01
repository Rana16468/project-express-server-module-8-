import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendRespone from "../../utility/sendRespone";
import { AcademicSemesterService } from "./academicSemester.services";



const createAcademicSemester=catchAsync(async(req,res)=>{

    const result=await AcademicSemesterService.createAcademicSemesterIntoDb(req.body);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Created Academic Semester',data: result})

});
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
  
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });

export const AcademicSemesterController={
    createAcademicSemester,
    getAllAcademicSemesters
}

