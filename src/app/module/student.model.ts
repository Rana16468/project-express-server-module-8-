import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students/student.interface';

//create student schema
const userNameScheme = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

// create guridanSchema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContractNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContractNo: { type: String, required: true },
});

//create local  localGuargian schema
const localGuargianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contractNo: { type: String, required: true },
  address: { type: String, required: true },
});

// student Schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameScheme,
  //enum
  gender: ['male', 'female'],
  email: { type: String, required: true },
  dethOfBirth: { type: String, required: true },
  contractNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  //enum
  bloodGroup: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  //enum
  isActive: ['active', 'inActive'],
  profileImg: { type: String, required: false },
  localGuargian: localGuargianSchema,
});

// create model
//https://mongoosejs.com/docs/typescript.html
export const studentModel = model<Student>('student', studentSchema);
