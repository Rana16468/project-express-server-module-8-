import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { LoginUserService } from "./auth.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import config from "../../config";


const loginUser:RequestHandler=catchAsync(async(req,res)=>{


    const data=req.body;
    const result=await LoginUserService.loginUserIntoAuth(data);
    const {refreshToken,accessToken,needsPasswordChange}=result;
    res.cookie('refreshToken',refreshToken,{secure:config.NODE_ENV==='production',httpOnly:true});

    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Login Successfully',data:{accessToken,needsPasswordChange}})
});

const changePassword:RequestHandler=catchAsync(async(req,res)=>{


    const {...passwordData}=req.body;

    const result=await LoginUserService.changePassword(req.user,passwordData);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Passoed is Updated Successfully Successfully',data:result})
});

const refreshToken:RequestHandler=catchAsync(async(req,res)=>{
   const { refreshToken}=req.cookies;
    const result=await LoginUserService.refreshToken(refreshToken);

    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Access token is Retrived Successfully',data:result})

});

export const  LoginUserController={
    loginUser,
    changePassword,
    refreshToken
}