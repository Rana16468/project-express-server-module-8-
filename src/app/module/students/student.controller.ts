import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';
//import studentSchema from './student.validation';




// find One 

const specigicStudent= async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const {studentId}=req.params;
  
    const result=await StudentServices.specificStudentFromDb(studentId);
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find Specific Student',data:result});
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
  sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Deleted Student',data:result})
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
    sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Successfully Find  Student',data:result})
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
