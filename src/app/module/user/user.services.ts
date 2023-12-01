import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import { User } from "../user.model";
import { TUser } from "./user.interface";
import { generateStudentId } from "./user.utilts";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

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

 export const UserService={
    createStudentIntoDb
 }