import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicFacultySearchableFields } from "./academicFaculty.constant";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFacultyIntoDb= async(payload:TAcademicFaculty)=>{


    const buildInAcademicFaculty= new AcademicFaculty(payload);
    const result=await buildInAcademicFaculty.save();
    return result;


}

const getAllAcademicFacultiesFormDb= async(query:Record<string,unknown>)=>{
   
    const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};


const getSingleAcademicFacultyFormDB=async(_id:string)=>{
    
    const result=await AcademicFaculty.findById(_id);
    return result
}

export const AcademicFacultyService={
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFormDb,
    getSingleAcademicFacultyFormDB,


}