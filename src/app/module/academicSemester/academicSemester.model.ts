import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constance";



const TacademicSemesterSchema= new Schema<TAcademicSemester>({
    name:{type:String,enum:{
        values:AcademicSemesterName,
        message:'{VALUE} is Not Requires'
    },required:[true,'Semester Name is Requires']},
    code:{
        type:String,
        enum:{
            values:AcademicSemesterCode,
            message:'{VALUE} is Not Requires'
        },
        required:[true,'Code is Required']
    },
    year:{
        type:String,required:[true,'Date is Required']
    },
    startMonth:{type:String,enum:{values:months,message:'{VALUE} is not Required '}, required:[true,'Start Month is Required']},
    endMonth:{type:String,enum:{values:months,message:'{VALUE} is not Required '}, required:[true,'End Month is Required']}

},{
    timestamps:true
});

//middlewere 

TacademicSemesterSchema.pre('save',async function(next){

   const isSemesterExists=await AcademicSemester.findOne({year:this.year,name:this.name});
   if(isSemesterExists)
   {
    throw new Error('This Year Already Semester Exists');
   }

    next();
})



export const AcademicSemester=model<TAcademicSemester>('AcademicSemester',TacademicSemesterSchema);
