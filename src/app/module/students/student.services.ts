import {Student} from '../student.model';




const getAllStudentFormDb = async () => {
  const result = Student.find();
  return result;
};
const deleteStudentFromDb=async(id:string)=>{
  console.log(id);
  const result=Student.updateOne({ id }, { isDeleted: true });
  return result;


}

//findone 
const specificStudentFromDb=async(id:string)=>{
  const result = Student.aggregate([{$match:{id:id}}]);
  return result;

}
export const StudentServices = {
 
  getAllStudentFormDb,
  specificStudentFromDb,
  deleteStudentFromDb
};
