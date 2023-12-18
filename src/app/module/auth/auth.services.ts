
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';

const loginUserIntoAuth=async(payload:TLoginUser)=>{

    // checking id the user is exist 

    const isUserExist=await User.isUserExistByCustomId(payload.id)
    
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

    // checking if the passoword is the corred
   
    if(!await User.isPasswordMatched(payload.password,isUserExist.password))
    {
        throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
    }

    // create token send to the client

    const jwtPayload={
        userId:isUserExist.id,
        role:isUserExist.role

    }

    // secret generatot =require('crypto').randomBytes(32).toString('hex')
    const accessToken=jwt.sign(jwtPayload, config.jwt_access_srcret as string, { expiresIn: '10d' });
      
    const refreshToken=jwt.sign(jwtPayload, config.jwt_refeesh_srcret as string, { expiresIn: '365d' });

    return {
        accessToken,
        needsPasswordChange:isUserExist.needsPasswordChange,
        refreshToken

    }




}

const changePassword= async(user:JwtPayload,payload:{
    oldPassword:string;
    newPassword:string;
})=>{


  // checking id the user is exist 

  const isUserExist=await User.isUserExistByCustomId(user.userId)
    
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

  // checking if the passoword is the corred
 
  if(!await User.isPasswordMatched(payload.oldPassword,isUserExist.password))
  {
      throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
  }
  // hash new Password 
const newHashedPassword=await bcrypt.hash(payload.newPassword,Number(config.byrypt_salt_rounds))
    
       await User.findOneAndUpdate({id:user.userId,role:user.role},{
        password:newHashedPassword,
        needsPasswordChange:false,
        passwordChangedAt: new Date()    
       
    });

    return null


}

// refresh token 
const refreshToken=async(token:string)=>{


    //checked if the token is valide

    const decoded = jwt.verify(token, config.jwt_refeesh_srcret as string) as JwtPayload;

    const {userId,iat}=decoded;

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

const jwtPayload={
    userId:isUserExist.id,
    role:isUserExist.role

}

// secret generatot =require('crypto').randomBytes(32).toString('hex')
const accessToken=jwt.sign(jwtPayload, config.jwt_access_srcret as string, { expiresIn: '10d' });

return {
    accessToken
}
}

export const LoginUserService={
    loginUserIntoAuth,
    changePassword,
    refreshToken
}