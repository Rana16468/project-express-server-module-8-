import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFacultyIntoDb= async(payload:TAcademicFaculty)=>{


    const buildInAcademicFaculty= new AcademicFaculty(payload);
    const result=await buildInAcademicFaculty.save();
    return result;


}

const getAllAcademicFacultiesFormDb= async()=>{
    const result= await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyFormDB=async(_id:string)=>{
    
    const result=await AcademicFaculty.findById(_id);
    return result
}

export const AcademicFacultyService={
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFormDb,
    getSingleAcademicFacultyFormDB,


}