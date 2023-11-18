import { Request, Response } from 'express';
import { StudentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    const result = await StudentServices.createStudentIntoDb(student);

    //will called sever function to this data

    res.status(200).json({
      success: true,
      message: 'create student successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all student
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFormDb();
    res.status(200).json({
      success: true,
      message: 'successfully get all data',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
};
