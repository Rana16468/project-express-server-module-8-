import mongoose from "mongoose";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";



const createCourseIntoDb=async(payload:TCourse)=>{

const result=await Course.create(payload);
return result;

};
const getAllCourseIntoDb=async(query:Record<string,unknown>)=>{

    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
      )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
      const result = await courseQuery.modelQuery;
      const meta = await courseQuery.countTotal();
      return {meta,result};

    // const result=await Course.find().populate('preRequisiteCourses.course');
    // return result;
}

const getSingleCourseIntoDb=async(id:string)=>{

    const result=await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const deleteCourseFromDb=async(id:string)=>{

    const result=await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true});
    return result;
}

// at a time added  update or delete arryof obejct 
const updateCourseIntoDb=async(id:string,payload:Partial<TCourse>)=>{

    const{ preRequisiteCourses,...courseRemaning}=payload;
   //start session
   const session=await mongoose.startSession();
    
    try{

        session.startTransaction();
        //step 1 : basic code update

        const basicCourseUpdated=await Course.findByIdAndUpdate(id,courseRemaning,{new:true,runValidators:true})
         if(!basicCourseUpdated)
         {
            throw new AppError(httpStatus.BAD_REQUEST,'Failded Baseic Code Update Session','');
         }
        // if there is a nay pre requissite  course to update 
         if(preRequisiteCourses && preRequisiteCourses.length>0){

           const deletedPreRequiste=preRequisiteCourses.filter((el)=>el.course && el.isDeleted).map((v)=>v.course);
           const deletedPreRequisteCourses=await  Course.findByIdAndUpdate(id,{
             $pull:{preRequisiteCourses:{course:{$in:deletedPreRequiste}}}
             },{new:true,runValidators:true});
             if(!deletedPreRequisteCourses)
             {
                throw new AppError(httpStatus.BAD_REQUEST,'Failded Delete Pre Requiste Update Session','');
             }
          
          // filter out the new course field 
             const newCourdesPreRequiste=preRequisiteCourses?.filter((el)=>el.course && !el.isDeleted)
             const newCourseAddPreRequiste=await Course.findByIdAndUpdate(id,{$addToSet:{preRequisiteCourses:{$each:newCourdesPreRequiste}}},{upsert:true,runValidators:true})
              if(! newCourseAddPreRequiste)
              {
                throw new AppError(httpStatus.BAD_REQUEST,'Failded New Course Added Requiste Update Session','');
              }

              const result=await Course.findById(id).populate('preRequisiteCourses.course');
              return result
   }

   await session.commitTransaction();
   await session.endSession();

    }
    catch(error)
    {
        await  session.abortTransaction();
        await session.endSession();
        

    }
    
}

// course Faculty 

const assignFacultyWithCourseIntoDb=async(id:string,payload:Partial<TCourseFaculty>)=>{
    // payload provide Array type data 
    // addToSet uplode data in the database ,and duplicate data can not be uplodeted to handel addToSet Method
    const result=await CourseFaculty.findByIdAndUpdate(id,{course:id,$addToSet:{faculty:{$each:payload}}},{upsert:true,new :true})
    return result;
}

// remove Course Faculty 
const removeFacultyWithCourseIntoDb=async(id:string,payload:Partial<TCourseFaculty>)=>{

    const result=await CourseFaculty.findByIdAndUpdate(id,{
        $pull:{faculty:{$in:payload}}
    },{new:true});
    return result;
}

const getFacultyWithCourseFromDb=async(courseId:string)=>{

    const result=await CourseFaculty.findOne({course:courseId}).populate('faculty');
    return result;



}

export const CourseService={
    createCourseIntoDb,
    getSingleCourseIntoDb,
    getAllCourseIntoDb,
    updateCourseIntoDb,
    deleteCourseFromDb,
    assignFacultyWithCourseIntoDb,
    removeFacultyWithCourseIntoDb,
    getFacultyWithCourseFromDb
}