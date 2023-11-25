import config from "../../config";
import { Student } from "../student.model";
import { TStudent } from "../students/student.interface";
import { User } from "../user.model";
import { TUser } from "./user.interface";

const createStudentIntoDb = async (password:string,studentData: TStudent) => {
    // build in staatic method in mongodb
 
 
   /*if(await Student.isUserExists(studentData.id))
   {
     throw new Error('User Already Exists')
   }*/
    //if password is not given,use default password

    const userData:Partial<TUser>={};
// set user password 
    userData.password=password || config.default_password as string;
    //set Student Role
    userData.role='user';
    //set munality auto generated id
    userData.id='19316468'

    // create a user model 
   const newUser = await User.create(userData);
   // create a student
   if(Object.keys(newUser).length){
    studentData.id=newUser.id;
    studentData.user=newUser._id;
   }

   const newStudent=await Student.create(studentData);

   return newStudent;
 };

 export const UserService={
    createStudentIntoDb
 }