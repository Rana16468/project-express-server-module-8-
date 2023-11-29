import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import { User } from "../user.model";
import { TUser } from "./user.interface";
import { generateStudentId } from "./user.utilts";

const createStudentIntoDb = async (password:string,payload: TStudent) => {
    

    const admissionSemester=await  AcademicSemester.findById(payload.admissionSemester)

    const userData:Partial<TUser>={};
// set user password 
    userData.password=password || config.default_password as string;
    //set Student Role
    userData.role='user';
    //set munality auto generated id
    userData.id=await generateStudentId(admissionSemester)


    

    // create a user model 
   const newUser = await User.create(userData);
   // create a student
   if(Object.keys(newUser).length){

     payload.user=newUser._id;
   }

   const newStudent=await Student.create(payload);

   return newStudent;
 };

 export const UserService={
    createStudentIntoDb
 }