
import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { User } from "../user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { FacultySearchableFields } from "./faculty.constant";
import QueryBuilder from "../../builder/QueryBuilder";




const getAllFacultyIntoDb=async(query:Record<string,unknown>)=>{

    // const result=await Faculty.find();
    // return result;


    const facultyQuery = new QueryBuilder(
        Faculty.find().populate('academicDepartment academicFaculty'),
        query,
      )
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
      const result = await facultyQuery.modelQuery;
      const meta = await facultyQuery.countTotal();
      return {
        meta,
        result,
      };
}
const getSingleFacultyIntoDb=async(_id:string)=>{
    const result=await Faculty.findById(_id);
    return result;


}


const deleteFacultyIntoDb=async(id:string)=>{
    

    const session=await mongoose.startSession();
    try{
        session.startTransaction();
        const facultyUser=await User.updateOne({id},{isDeleted:true},{upsert:true,session});
       
        if(!facultyUser){
            throw new AppError(httpStatus.BAD_REQUEST,'Faculty User Session Failed','');
        }
        const facultyDetails=await Faculty.updateOne({id},{isDeleted:true},{upsert:true,session});
        if(!facultyDetails)
        {
            throw new AppError(httpStatus.BAD_REQUEST,'Faculty Details Session Failed','');
        }
        await session.commitTransaction();
        await session.endSession();
        return facultyDetails;

    }
    catch(error){
        await session.abortTransaction();
        await session.endSession();

    }




}

const updateFacultyIntoDb=async(_id:string,payload:TFaculty)=>{


    const{name,guirdian,...remaningStudentData}=payload;
    const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData};
    if(name && Object.keys(name))
    {

      for(const [key,value] of Object.entries(name))
      {


        modifiedUpdatedData[`name.${key}`]=value
      }
    }
   
    
    if(guirdian && Object.keys(guirdian))
    {
      for(const [key,value] of Object.entries(guirdian))
      {
        modifiedUpdatedData[`guirdian.${key}`]=value
      }
    }
    const result=await Faculty.findByIdAndUpdate(_id, modifiedUpdatedData,{new:true,runValidators:true});
    return result;



}

export const FacultyService={
    getAllFacultyIntoDb,
    getSingleFacultyIntoDb,
    deleteFacultyIntoDb,
    updateFacultyIntoDb
}