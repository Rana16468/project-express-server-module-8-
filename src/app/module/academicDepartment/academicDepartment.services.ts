import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicDepartmentSearchableFields } from "./academicDepartment.constant";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDb= async(paylod:TAcademicDepartment)=>{
   
    const buildInDepart=new AcademicDepartment(paylod);
    const result=await buildInDepart.save();
    return result;


}

const  getAllAcademicDepertmentFormDb=async(query:Record<string,unknown>)=>{

    
    const academicDepartmentQuery = new QueryBuilder(AcademicDepartment.find().populate('academicFaculty'),
        query,
      )
        .search(AcademicDepartmentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
      const result = await academicDepartmentQuery.modelQuery;
      const meta = await academicDepartmentQuery.countTotal();
      return{
        result,
        meta
      }
    


    // const result=await AcademicDepartment.find().populate('academicFaculty');
    // return result;
}

const getSingleAcademicDepertmentFormDb=async(_id:string)=>{
    

    const result=await AcademicDepartment.findById(_id).populate('academicFaculty');
    return result;

}

const updateAcademicDepartmentIntoDb=async(id:string,payload:Promise<TAcademicDepartment>)=>{

    const result=await AcademicDepartment.findOneAndUpdate({_id:id},payload,{new:true});
    return result;


}

export const AcademicDepartmentService={
    createAcademicDepartmentIntoDb,
    getAllAcademicDepertmentFormDb,
    getSingleAcademicDepertmentFormDb,
    updateAcademicDepartmentIntoDb
}