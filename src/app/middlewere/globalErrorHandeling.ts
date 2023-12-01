import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandelar=(err:any,req:Request,res:Response,next:NextFunction)=>{

  const statusCode=err.statusCode || 500

    return res.status(statusCode).json({success:false,message:'some thing went wrong',error:err.message});
    next();
  }

  export default globalErrorHandelar;