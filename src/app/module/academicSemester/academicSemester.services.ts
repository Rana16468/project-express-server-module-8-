
import { academicSemesterCodeMapper } from "./academicSemester.constance";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

 const createAcademicSemesterIntoDb=async(payload:TAcademicSemester)=>{

    // Semser code checking 01 02 03 like  16 15 16  cis ,cse or etc 

    if(academicSemesterCodeMapper[payload.name]!==payload.code){
        throw new Error('Invalide Semester Code ');
    }
   const buildInAcademicSemester=new  AcademicSemester (payload);
   const result=await buildInAcademicSemester.save();
   return result;


 }

 export const AcademicSemesterService={
    createAcademicSemesterIntoDb
 }