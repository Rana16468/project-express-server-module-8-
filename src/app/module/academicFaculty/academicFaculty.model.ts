import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";



const TAcademicFacultySchema= new Schema<TAcademicFaculty>({
    name:{type:String,required:[true,'Academic Faculty Name is Required'],unique:true}
    
},{
    timestamps:true
});

export const AcademicFaculty=model<TAcademicFaculty>('AcademicFaculty',TAcademicFacultySchema);