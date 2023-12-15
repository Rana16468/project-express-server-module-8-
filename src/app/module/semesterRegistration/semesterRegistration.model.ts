import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";




const TSemesterRegistrationSchema=new Schema<TSemesterRegistration>({

    academicSemester:{type:Schema.Types.ObjectId,ref:'AcademicSemester', unique:true,trim:true,required:[true,'Academic Semester is Required']},
    status:{type:String,enum:{
        values:['UPCOMMING' , 'ONGOING' , 'ENDED'],
        message:'{VALUE} is Not Require'
    },required:[true,'Status is Required'],default:'UPCOMMING'},
    startDate:{type:Date,required:[true,'Start Date is Required']},
    endDate:{type:Date,required:[true,'End Date is Required']},
    minCredite:{
        type:Number,
        required:[false,'Min Credite is Not Required'],
        default:3
    },
    maxCredite:{
        type:Number,
        required:[false,'Max Credite is Not Required'],
        default:15
    }

},{
    timestamps:true
});

export const SemesterRegistration=model<TSemesterRegistration>('SemesterRegistration',TSemesterRegistrationSchema);
