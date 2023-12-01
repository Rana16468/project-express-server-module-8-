import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";



const TAcademicDepartmentSchema= new Schema<TAcademicDepartment>({
    name:{type:String,required:[true,'Department Name is Required'],unique:true},
    academicFaculty:{type:Schema.Types.ObjectId,required:[true,'Academic Faculty is Required'],ref:'AcademicFaculty'}
},{
    timestamps:true
});



//middlerere
TAcademicDepartmentSchema.pre('save',async function(next){

    const isDepartmentExists=await AcademicDepartment.findOne({name:this.name});
    if(isDepartmentExists)
    {
        throw new AppError(httpStatus.NOT_FOUND,'This Department is  Alreday Exist','');
    }


    next();
});
TAcademicDepartmentSchema.pre('findOneAndUpdate',async function(next){

    const query=this.getQuery();
    // return { _id: '656818692945d43bbf6b7938' }
   const isExistsDepartment=await AcademicDepartment.findOne(query);
   if(!isExistsDepartment)
   {
    throw new AppError(httpStatus.NOT_FOUND,'Department does not Exists','');
   }
    next()
});




export const AcademicDepartment=model<TAcademicDepartment>('AcademicDepartment',TAcademicDepartmentSchema);
