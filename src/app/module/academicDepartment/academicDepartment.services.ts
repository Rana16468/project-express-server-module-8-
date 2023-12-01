import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDb= async(paylod:TAcademicDepartment)=>{
   
    const buildInDepart=new AcademicDepartment(paylod);
    const result=await buildInDepart.save();
    return result;


}

const  getAllAcademicDepertmentFormDb=async()=>{

    const result=await AcademicDepartment.find().populate('academicFaculty');
    return result;
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