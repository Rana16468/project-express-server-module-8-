import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import httpStatus from "http-status";
import sendRespone from "../../utility/sendRespone";




const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
  
      const {password,student} = req.body;

      const result=await UserService.createStudentIntoDb(password,student);

      sendRespone(res,{statusCode:httpStatus.OK,success:true,message:'Create Student Suucessfully',data:result})
    // creating a schema validation using zod
    
     
      // joi validation 
      // const {error,value}=studentSchema.validate(student);
      // console.log({error});
      // if(error)
      // {
      //   res.status(500).send({success:false,message:'something went wrong',error:error.details})
      // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
     next(error);
    }
  };

  export const UserController={
    createStudent
  }
  