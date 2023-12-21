import { Types } from "mongoose";

export type TFacultyName={
    firstName:string;
    middleName?:string;
    lastName:string;
}
export type TGender='Male' | 'Female'
export type TBloodGroup ='A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TFacultyGuirdian={
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;

}

export type TFaculty={
    id:string;
    user:Types.ObjectId;
    name:TFacultyName;
    designation:string;
    gmail:string;
    email:string;
    gender:TGender
    bloogGroup?: TBloodGroup;
    dateOfBirth:string;
    contractNo:string;
    emergencyContractNo:string;
    presentAddress:string;
    permanentAddress:string;
    guirdian:TFacultyGuirdian;
    academicDepartment:string;
    profileImg:string;
    isDeleted:boolean;
}