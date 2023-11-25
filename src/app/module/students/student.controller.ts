import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';
//import studentSchema from './student.validation';




// find One 

const specigicStudent= async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const {studentId}=req.params;
    console.log(studentId);
    const result=await StudentServices.specificStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'create student successfully',
      data: result,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(error){
    next(error);

  }
}


const deleteStudent=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const {studentId}=req.params;
   

  const result=await StudentServices.deleteStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'student delete successfully',
    data: result,
   });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(error:any){
  next(error)
  }




}

//get all student
const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFormDb();
    res.status(200).json({
      success: true,
      message: 'successfully get all data',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  specigicStudent,
  deleteStudent
};
