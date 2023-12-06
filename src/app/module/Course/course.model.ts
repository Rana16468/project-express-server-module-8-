import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";



const TPreRequisiteCourseSchema=new Schema<TPreRequisiteCourses>({

    course:{type:Schema.Types.ObjectId,required:[true,'Course ID is Required'],ref:'Course'},
    isDeleted:{type:Boolean,required:[false,'is Deleted is Required'],default:false}
})

const TCourseSchema=new Schema<TCourse>({
    title:{type:String,trim:true,unique:true,required:[true,'Course is Required']},
    prefix:{type:String,trim:true,required:[true,'Prefix is Required']},
    code:{type:Number,trim:true,required:[true,'Code is Required']},
    credits:{type:Number,trim:true,required:[true,'Credits is Required']},
    preRequisiteCourses:{type:[TPreRequisiteCourseSchema],required:[false,'Pre Requisite Courses is Required']},
 isDeleted:{type:Boolean,default:false,required:[true,'Is Deleted Required']}

},{
    timestamps:true
});

// course Faculty model 

const TCourseFacultySchema=new Schema<TCourseFaculty>({
    course:{
        type:Schema.Types.ObjectId,
        unique:true,
        required:[true,'Course Faculty is Required'],
        ref:'Course'
    },
    faculty:{
        type:[{type:Schema.Types.ObjectId,ref:'Faculty'}]
    }
},{
    timestamps:true
});



export const Course= model<TCourse>('Course',TCourseSchema);
export const CourseFaculty=model<TCourseFaculty>('CourseFaculty',TCourseFacultySchema);