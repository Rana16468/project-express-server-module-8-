
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";



const createSemesterRegistrationIntoDb=async(payload:TSemesterRegistration)=>{

    // check if there anyregister semester that is alredy upcomming or ongoing 
    const isThereAnyUpcommingAndOngoingSemester=await SemesterRegistration.findOne({
        $or:[
            {status:'UPCOMMING'},
            {status:'ONGOING'}
        ]
    });
    if(isThereAnyUpcommingAndOngoingSemester)
    {
        throw new AppError(httpStatus.BAD_REQUEST,`There is a alredy ${isThereAnyUpcommingAndOngoingSemester.status}`,'')
    }

    const academicSemester=payload?.academicSemester;
   // acdemic semster exists 
    const isAcademicSemesterExits=await AcademicSemester.findById(academicSemester);
    if(!isAcademicSemesterExits)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Semester is Not Exits','')
    }
    // alredy this semester registartion exists ot not 
    const isSemesterRegistrationExits=await SemesterRegistration.findOne({academicSemester});
    if(isSemesterRegistrationExits)
    {
        throw new AppError(httpStatus.CONFLICT,'Academic Semester is Already Exits','');
    }

    const buildInSemesterRegistration= new SemesterRegistration(payload);
    const result=await buildInSemesterRegistration.save();
    return result;

}

const getAllSemesterRegistrationFromDb=async(query:Record<string,unknown>)=>{

const semesterRegistrationQuery= new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),query).filter().sort().paginate();
const result=await semesterRegistrationQuery.modelQuery;
return result;
}

const getSingleSemesterRegistrationFromDb=async(id:string)=>{

    // if the request semester regintration is ended,we will not update Any thing 

    const result=await SemesterRegistration.findById(id);
    return result;
} 

const updateSemesterRegistrationFromDb=async(id:string,payload:Partial<TSemesterRegistration>)=>{
     //checked requested semester already  exist 
     const isSemesterRegistrationExits=await SemesterRegistration.findById(id);
     if(!isSemesterRegistrationExits)
     {
         throw new AppError(httpStatus.NOT_FOUND,'This Semester is Not Found','');
     }

     // if the request semester regintration is ended,we will not update Any thing 
    const CurrentrequestedSemester=isSemesterRegistrationExits.status;
    const requestedSemesterSatus=payload?.status;
    if(CurrentrequestedSemester==='ENDED')
    {
      throw new AppError(httpStatus.BAD_REQUEST,`This Semester Already  ${CurrentrequestedSemester}`,'');
    }
    // UPCOMMING ----> ONGOING----->ENDED
    if(CurrentrequestedSemester==='UPCOMMING' && requestedSemesterSatus==='ENDED')
    {
        throw new AppError(httpStatus.BAD_REQUEST,`you can't direclty change status from ${CurrentrequestedSemester} to ${requestedSemesterSatus}`,'');
    }
    // ONGOING--->UPCOMMING ---->
    if(CurrentrequestedSemester==='ONGOING' && requestedSemesterSatus==='UPCOMMING')
    {
        throw new AppError(httpStatus.BAD_REQUEST,`you can't direclty change status from ${CurrentrequestedSemester} to ${requestedSemesterSatus}`,'');
    }

    const result=await SemesterRegistration.findByIdAndUpdate(id,payload,{new:true, runValidators:true})
  return result;
}

export const SemesterRegistrationService={
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationFromDb
}