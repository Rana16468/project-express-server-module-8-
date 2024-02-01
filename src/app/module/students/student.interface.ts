import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id:string,
  user:Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  academicDepartment:Types.ObjectId;
  admissionSemester:Types.ObjectId;
  academicFaculty:Types.ObjectId;

  isDeleted:boolean
};

// for creating static 
 export interface StudentModels extends Model<TStudent>{
  // eslint-disable-next-line no-unused-vars
  isUserExists(id:string):Promise<TStudent | null> 

 }


// for creating instance 

//for creating isntance 
/*export type StudentMethods={
  isUserExist(id:string):Promise<TStudent | null> 
}*/
// Create a new Model type that knows about Student Methods...
//export type  StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;