/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import { User } from "../user.model";
import { TUser } from "./user.interface";
import { generateAdminId, generateFaultyId, generateStudentId } from "./user.utilts";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { Faculty } from "../Faculty/faculty.model";
import { Admin } from "../AdminUser/admin.model";
import { TAdmin } from "../AdminUser/admin.interface";
import { sendImageToCloudinary } from "../../utility/sendImageToCloudinary";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";



const createStudentIntoDb = async (password:string,payload: TStudent,file:any) => {
    
    const admissionSemester=await  AcademicSemester.findById(payload.admissionSemester)

    const userData:Partial<TUser>={};
// set user password 
    userData.password=password || config.default_password as string;
    //set Student Role
    userData.role='user';
    userData.email=payload?.email;


     // find department
 
   const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Aademic department not found','');
  }
  payload.academicFaculty=academicDepartment.academicFaculty;
    //set munality auto generated id
    userData.id=await generateStudentId(admissionSemester);
    

    //send image to Cloudinary
    if(file)
    {
      const imageName=`${userData.id}${payload.name.firstName}`;
      const path=file?.path
     const  {secure_url}= await sendImageToCloudinary(imageName,path) as any;
     payload.profileImg=secure_url;
    }

    
   
    const session=await mongoose.startSession();


    try{
      session.startTransaction();
    
      // create a user model 
     const newUser = await User.create([userData],{session});
     
     // create a student
     if(!newUser.length){

      throw new AppError(httpStatus.BAD_REQUEST,'failed to Create User','');
     }
     payload.id= newUser[0].id
     payload.user=newUser[0]._id;
   
    


     // create a student (transaction 2)
   

      const newStudent = await Student.create([payload], { session });
      if(!newStudent.length)
     {
      throw new AppError(httpStatus.BAD_REQUEST,'failed to Create Student','');
     }
     await session.commitTransaction();
     await session.endSession();
  
     return newStudent;
  
     
    }
    catch(error){
      await session.abortTransaction();
      await session.endSession();
    }
 
 };


 const createFacultyIntoDb= async (password:string,payload:TFaculty,file:any)=>
 {
       const userData:Partial<TUser>={};
       userData.password= password  || config.default_password as string;
       userData.role='faculty';
       userData.email=payload?.email;




       // academic faculty Id Collected
       const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment
      );
    
      if (!academicDepartment) {
        throw new AppError(400, 'Aademic department not found','');
      }
      payload.academicFaculty=academicDepartment.academicFaculty;
      

       userData.id=await generateFaultyId();
       if(file)
       {
        const imageName=`${userData.id}${payload.name.firstName.trim()}`;
       const path=file?.path
       const  {secure_url}= await sendImageToCloudinary(imageName,path) as any;
       payload.profileImg=secure_url;
       }



       const session=await mongoose.startSession();
       try{
        session.startTransaction();
      
        const newFaculty=await User.create([userData],{session});
        if(!newFaculty.length){
          throw new AppError(httpStatus.BAD_REQUEST,'Faculty Create Session Failed','');
        }
        payload.id=newFaculty[0].id;
        payload.user=newFaculty[0]._id;
       

        const facultyInfo=await Faculty.create([payload],{session});
        if(!facultyInfo.length){
          throw new AppError(httpStatus.BAD_REQUEST,'Faculty Information Create Session Failed','');
        }
        await session.commitTransaction();
        await session.endSession();
        return facultyInfo;
       }
       catch(error){

        await session.abortTransaction();
        await session.endSession();
       }

 }


 const createAdminIntoDB = async (password: string, payload: TAdmin,file:any) => {

  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password= password  || config.default_password as string;
  userData.role = 'admin';
  userData.email=payload?.email;
    //set  generated id
  userData.id = await generateAdminId();
  const session=await mongoose.startSession();

  try{
    session.startTransaction();

    userData.id=await generateAdminId();
    if(file)
       {
        const imageName=`${userData.id}${payload.name.firstName.trim()}`;
       const path=file?.path
       const  {secure_url}= await sendImageToCloudinary(imageName,path) as any;
       payload.profileImg=secure_url;
       }
    const newAdmin=await User.create([userData],{session});
    if(!newAdmin.length){
      throw new AppError(httpStatus.BAD_REQUEST,'Admin User Create Session Failed','');
    }
    payload.id=newAdmin[0].id;
    payload.user=newAdmin[0]._id;

    const adminInfo=await Admin.create([payload],{session});
    if(!adminInfo.length){
      throw new AppError(httpStatus.BAD_REQUEST,'Admin Information Create Session Failed','');
    }
    await session.commitTransaction();
    await session.endSession();
    return adminInfo

  }
  catch(err)
  {
    await session.abortTransaction();
    await session.endSession();
  }
    
  
  
};

// getme serviece function 
const getMe=async(userId:string,role:string)=>{
  // const decoded=vificationToken(token,config.jwt_access_srcret as string);
  // const {userId,role}=decoded;

  let result={} || null;
  if(role==='user')
  {
    result=await Student.findOne({id:userId});
  }
  else if(role==='faculty')
  {
    result=await Faculty.findOne({id:userId});
  }
  else{
    result=await Admin.findOne({id:userId});
  }



  return result


}

const changeStatus=async(id:string,payload:{status:string})=>{

  const result=await User.findByIdAndUpdate(id,payload,{new:true,runValidators:true})

  return result;

}

 export const UserService={
    createStudentIntoDb,
    createFacultyIntoDb,
    createAdminIntoDB,
    getMe,
    changeStatus
 }