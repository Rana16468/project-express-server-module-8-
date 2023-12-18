import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { AdminService } from "./admin.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const getAllAdmin:RequestHandler=catchAsync(async(req,res)=>{
  
    const result=await AdminService.getAllAdminsFromDB(req.params) ;
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'get All Admin Successfully',data:result});

});
const getSingleAdmin:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await  AdminService.getSingleAdminFromDB(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'get Single Admin Successfully',data:result});
});
export const AdminController={
    getSingleAdmin,
    getAllAdmin
}