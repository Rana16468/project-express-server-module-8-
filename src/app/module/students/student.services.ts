import mongoose from 'mongoose';
import {Student} from '../student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';




const getAllStudentFormDb = async (query:Record<string,unknown>) => {

  const studentSearchableField=['email','name.firstName',"presentAddress"]

  const studentQuery= new QueryBuilder(Student.find(),query);
  studentQuery.search(studentSearchableField).filter().sort().paginate().fields();
  const result= await studentQuery.modelQuery;
  return result;
 /* let searchTerm='';
  const studentSearchableField=['email','name.firstName',"presentAddress"]


  
  if(query?.searchTerm)
  {
    searchTerm=query?.searchTerm as string
  }

  const searchQuery=Student.find({
    $or:studentSearchableField.map((field)=>({[field]:{$regex:searchTerm,$options:'i'}}))
  });

  // filttering 
  const queryObject={...query};
  const excludeField=['searchTerm','sort','limit','page','fields'];
  excludeField.forEach(el=>delete queryObject[el]);

//console.log(excludeField);
  const filterQuery =searchQuery.find(queryObject).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:'academicFaculty'
});

let sort='-createdAt'
if(query.sort){

  sort=query.sort as string
}

//sortQuery
const sortQuery= filterQuery.sort(sort);
//limit 
let limit=1;
let page=1;
let skip=1;
if(query?.limit)
{
  limit=Number(query?.limit);
  
}
if(query?.page)
{
  page=Number(query?.page);
  skip=(page -1)*limit;
}
//pagination 
const paginationQuery=sortQuery.skip(skip);
const limitQuery= paginationQuery.limit(limit);

// file limiting 

let fields='-__v';
if(query.fields){

  fields=(query.fields as string).split(',').join(' ');
 
}

const fieldQuery=await limitQuery.select(fields);


return fieldQuery;*/
};


const deleteStudentFromDb=async(id:string)=>{

  const result=await Student.updateOne({ id }, { isDeleted: true });
  return result;


}

//findone 
const specificStudentFromDb=async(id:string)=>{
  const result = await Student.findById(id).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:'academicFaculty'
  })
  return result;

}

// delete 
const deleteStudentFormDb=async(id:string)=>{

  const session=await mongoose.startSession();
  try{
    session.startTransaction();
    const deletedStudent=await Student.findOneAndUpdate({id},{isDeleted:true},{upsert:true,session});
   if(!deletedStudent)
   {
    throw new AppError(httpStatus.BAD_REQUEST,'Student Delete Request Failded','');
   }

   const deleteUser=await User.findOneAndUpdate({id},{isDeleted:true},{upsert:true, session});
   if(!deleteUser)
   {
    throw new AppError(httpStatus.BAD_REQUEST,'USER Delete Request Failded','');
   }
   await session.commitTransaction();
   await session.endSession();

    return deleteStudentFormDb;
  }
  catch(error){
    await session.abortTransaction();
    await session.endSession();
  }
 
}

//update 
const updateStudentIntoDb=async(id:string ,payload:Partial<TStudent>)=>{

const{name,guardian,localGuardian,...remaningStudentData}=payload;

const modifiedUpdatedData:Record<string,unknown>={...remaningStudentData}

if(name && Object.keys(name))
{
  for(const [key,value] of Object.entries(name))
  {
    modifiedUpdatedData[`name.${key}`]=value
  }
}
/*'$namefirstName': 'Mahebur',
  '$namemiddleName': 'Rahman',
  '$namelastName': 'Joy',
  '$guardianfatherName': 'Father Name',
  '$guardianfatherOccupation': 'Engineer',
  '$guardianfatherContactNo': '1112223333',
  '$guardianmotherName': 'Mother Name',
  '$guardianmotherOccupation': 'Doctor',
  '$guardianmotherContactNo': '4445556666',
  '$guardianname': 'Local Guardian Name',
  '$guardianoccupation': 'Teacher',
  '$guardiancontactNo': '7778889999',
  '$guardianaddress': '789 Pine Road, Village' */

if(guardian && Object.keys(guardian))
{
  for(const [key,value] of Object.entries(guardian))
  {
    modifiedUpdatedData[`guardian.${key}`]=value
  }
}

if(localGuardian && Object.keys(localGuardian))
{
  for(const [key,value] of Object.entries(localGuardian))
  {
    modifiedUpdatedData[`localGuardian.${key}`]=value
  }
}



  const result=await Student.findOneAndUpdate({id},modifiedUpdatedData,{upsert:true,runValidators:true});
  return result

}
export const StudentServices = {
 
  getAllStudentFormDb,
  specificStudentFromDb,
  deleteStudentFromDb,
  deleteStudentFormDb,
  updateStudentIntoDb
};
