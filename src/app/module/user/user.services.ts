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

const createStudentIntoDb = async (password:string,payload: TStudent) => {
    
    const admissionSemester=await  AcademicSemester.findById(payload.admissionSemester)

    const userData:Partial<TUser>={};
// set user password 
    userData.password=password || config.default_password as string;
    //set Student Role
    userData.role='user';
    //set munality auto generated id

    const session=await mongoose.startSession();


    try{
      session.startTransaction();
      userData.id=await generateStudentId(admissionSemester)
      // create a user model 
     const newUser = await User.create([userData],{session});
     // create a student
     if(!newUser.length){

      throw new AppError(httpStatus.BAD_REQUEST,'failed to Create User','');
     }
     payload.id= newUser[0].id
     payload.user=newUser[0]._id;
    
     // create a student (transaction 2)
     const newStudent=await Student.create([payload],{session});
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


 const createFacultyIntoDb= async (password:string,payload:TFaculty)=>
 {
       const userData:Partial<TUser>={};
       userData.password= password  || config.default_password as string;
       userData.role='faculty';

       const session=await mongoose.startSession();
       try{
        session.startTransaction();
        userData.id=await generateFaultyId();
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


 const createAdminIntoDB = async (password: string, payload: TAdmin) => {

  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password= password  || config.default_password as string;
  userData.role = 'admin';
    //set  generated id
  userData.id = await generateAdminId();
  const session=await mongoose.startSession();

  try{
    session.startTransaction();

    userData.id=await generateAdminId();
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

 export const UserService={
    createStudentIntoDb,
    createFacultyIntoDb,
    createAdminIntoDB
 }