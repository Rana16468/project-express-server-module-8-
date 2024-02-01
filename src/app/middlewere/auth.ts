

import { NextFunction, Request, Response } from "express";

import catchAsync from "../utility/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../module/user/user.interface";
import { User } from "../module/user.model";



const auth=(...requireRoles:TUserRole[])=>{

    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 
        // jod validation token 
        // if the the token send  form the  client 
        const token=req.headers.authorization;
        if(!token)
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not Authorized','')
        }
        //checked if the token is valide

        let decoded;
        try{
            decoded = jwt.verify(token, config.jwt_access_srcret as string) as JwtPayload;
        }
        catch(error)
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized','');
            
        }

        //const decoded = jwt.verify(token, config.jwt_access_srcret as string) as JwtPayload;

        const {userId,role,iat}=decoded;

        // user authorigation ---->
        // checking id the user is exist 

  const isUserExist=await User.isUserExistByCustomId(userId)
    
  if(!isUserExist)
  {
      throw new AppError(httpStatus.NOT_FOUND,'This User is Not Founded','')
  }

  // checking if the user alredy deleted 
  const isDeleted=isUserExist.isDeleted
  if(isDeleted)
  {
      throw new AppError(httpStatus.FORBIDDEN,'This User is Deleted','')
  }

  // checked if the user is blocked 
  const userStatus=isUserExist.status;
  if(userStatus==='blocked')
  {
      throw new AppError(httpStatus.FORBIDDEN,'This User is Blocked','')
  }

  if(isUserExist.passwordChangedAt && await User.isJWTIssuesBeforePasswordChange(isUserExist.passwordChangedAt,iat as number))
  {
    throw new AppError(httpStatus.FORBIDDEN,'UnExpected Token','')
  }
  

  



  // checking if the passoword is the corred
        
        if(requireRoles && !requireRoles.includes(role))
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'Yout Role Not Exist','') 
        }
       req.user=decoded as JwtPayload
       next();
       
      })
}

export default auth;