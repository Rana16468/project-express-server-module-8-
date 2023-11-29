import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "../user.model";



const findLastStudentId= async()=>{


    const lastStudent=await User.findOne({role:'user'},{_id:0,id:1}).sort({
        
createdAt:-1
    }).lean();
    return lastStudent?lastStudent?.id.substring(6):undefined;


}
export const generateStudentId=async(payload:TAcademicSemester)=>{

    // first Time 0000,then 0001

    console.log(await findLastStudentId());

    const currentId=await findLastStudentId() || (0).toString()
     let incrementId=(Number(currentId) + 1).toString().padStart(4,'0');
    incrementId=`${payload.year}${payload.code}${incrementId}`
   

    return incrementId

     

}