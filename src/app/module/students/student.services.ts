import { studentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const result = await studentModel.create(student);

  return result;
};

const getAllStudentFormDb = async () => {
  const result = studentModel.find();
  return result;
};
export const StudentServices = {
  createStudentIntoDb,
  getAllStudentFormDb,
};
