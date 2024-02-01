
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utilts";
import QueryBuilder from "../../builder/QueryBuilder";
import { Student } from "../student.model";



const createOfferedCourseIntoDb=async(payload:TOfferedCourse)=>{

    // if the semester registrationit exists 

    const {semesterRegistration,academicFaculty,academicDepartment,course,faculty,section,days,startTime,endTime}=payload
    const isSemesterRegistrationExists=await SemesterRegistration.findById(semesterRegistration);
    if(!isSemesterRegistrationExists)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Semester Registration Id Not Founded','');
    }

    const isAcademicFacultyExist=await AcademicFaculty.findById(academicFaculty);
    if(!isAcademicFacultyExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Faculty Id Not Founded','');
    }

    const isAcademicDepartmentExist=await AcademicDepartment.findById(academicDepartment);
    if(!isAcademicDepartmentExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Department Id Not Founded','');
    }
    const isCourseExist=await Course.findById(course);
    if(!isCourseExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Courset Id Not Founded','');
    }
    const isFacultyExist=await Faculty.findById(faculty);
    if(!isFacultyExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,'Faculty Id Not Founded','');
    }


    //checked if the depertment is belong to the faculty 
    const isDepertmentBelogToFaculty=await AcademicDepartment.findOne({

        academicFaculty,
        _id:academicDepartment
    });
    if(!isDepertmentBelogToFaculty)
    {
        throw new AppError(httpStatus.NOT_FOUND,`this ${isAcademicFacultyExist.name} is not belog to this ${isAcademicDepartmentExist.name}`,'');
    }
    payload.academicSemester=isSemesterRegistrationExists.academicSemester;
 // checked of the same course same section in same  registered semester exits 

 const isSemesterOfferedCourseExitsWithSemesterRegisterWithSameSection=await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section
 });

 if(isSemesterOfferedCourseExitsWithSemesterRegisterWithSameSection)
 {
    throw new AppError(httpStatus.NOT_FOUND,`Offered Course with same section alredy exist`,'');
 }

 
 // get the schedules of the faculty 

 const newSchedules={
    startTime,endTime,days
 }


const assignedSchedules=await OfferedCourse.find({
   semesterRegistration,
    faculty,
    days:{$in: days}
}).select('days startTime endTime');

if(hasTimeConflict(assignedSchedules,newSchedules))
{
    throw new AppError(httpStatus.CONFLICT,'The Faculy Time is Not Avaliable','');
}


    const result=await OfferedCourse.create(payload);
    return result;


}

const updateOfferedCourseIntoDb=async(id:string,payload:Pick<TOfferedCourse,'faculty' | 'startTime' | 'endTime' | 'days'>)=>{

const {faculty, startTime,endTime,days}=payload;
const isOfferedCourseExist=await OfferedCourse.findById(id);
if(!isOfferedCourseExist)
{
    throw new AppError(httpStatus.NOT_FOUND,'Offered Course is Not Exist','');
}
const isOfferedFacultyExist=await Faculty.findById(faculty);
if(!isOfferedFacultyExist)
{
    throw new AppError(httpStatus.NOT_FOUND,'Offered Course Faculty is Not Exist','');
}

const semesterRegistration=isOfferedCourseExist?.semesterRegistration;

const semesterRegistrationStatus=await SemesterRegistration.findById(semesterRegistration);
if(semesterRegistrationStatus?.status!=='UPCOMMING')
{
    throw new AppError(httpStatus.BAD_REQUEST,`you can not update this offered course as it is ${semesterRegistrationStatus?.status}`,'');
} 



const newSchedules={
    startTime,endTime,days
 }


const assignedSchedules=await OfferedCourse.find({
   semesterRegistration,
    faculty,
    days:{$in: days}
}).select('days startTime endTime');

if(hasTimeConflict(assignedSchedules, newSchedules))
{
    throw new AppError(httpStatus.CONFLICT,'The Faculy Time is Not Avaliable','');
}

const result=await OfferedCourse.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
return result;


}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await offeredCourseQuery.modelQuery;
    const meta = await offeredCourseQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };

  const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);
  
    if (!offeredCourse) {
      throw new AppError(404, 'Offered Course not found','');
    }
  
    return offeredCourse;
  };

  const getMyOfferedCoursesFromDB =async(userId:string,query:Record<string,unknown>)=>{

      // pagination setup
      const page=Number(query?.page) || 1
     
      const limit=Number(query?.limit) || 10
      
      const skip=(page-1)*limit;

    const student=await Student.findOne({id:userId});
    if(!student)
    {
        throw new AppError(httpStatus.NOT_FOUND, 'Student Not Founded','');
    }
    // current onGoing semester
    const currentOnGoingRegistrationSemester=await SemesterRegistration.findOne({status:"ONGOING"});
    if(!currentOnGoingRegistrationSemester)
    {
        throw new AppError(httpStatus.NOT_FOUND, 'There is No Ongoing Semester Registration','');
    }

    const aggregationQuery=[
        // satage 1
        {
            $match:{
                semesterRegistration: currentOnGoingRegistrationSemester._id,
                academicFaculty:student?.academicFaculty,
                academicDepartment:student?.academicDepartment


            }   
        },
        // statge 2
        {
            $lookup:{
                from:"courses",
                localField:"course",
                foreignField:"_id",
                as:"course"

            }
        },
        // statge 3
        {
            $unwind:"$course"
        },
        // statge 4
        {
            $lookup:{
                from:"enrolledcourses",
                let: {
                    currentOngoingRegistrationSemester:
                      currentOnGoingRegistrationSemester._id,
                      currentStudent: student._id,
                    
                  },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                   {eq:['$semesterRegistration','$$currentOngoingRegistrationSemester']},
                                   {eq:['$student','$$currentStudent']},
                                   {eq:['$isEnrolled',true]}
                                ]
                            }
                        }
                    }
                ],
                as: 'enrolledcourses'
            }
        },
        // state 5
        {
            $lookup:{
                from:"enrolledcourses",
                let: {
                    currentStudent:student?._id
                   
                    
                  },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                    {eq:['$student','$$currentStudent']},
                                    {eq:['$isCompleted',true]}
                                   
                                ]
                            }
                        }
                    }
                ],
                as: 'completedCourse'
            }

        },
        // state 6
        {
            $addFields:{
                isCompletedCourseIds:{
                    $map:{
                        input:'$completedCourse',
                        as:"completed",
                        in:"$$completed.course"
                    }
                }
            }
        },

        {
            $addFields:{

                preRequisiteFulField:{
                    $or:[
                        {$eq:["$course.preRequisiteCourses",[]]},
                        {$setIsSubset:[
                            '$course.preRequisiteCourses.course','$isCompletedCourseIds'
                        ]}
                    ]

                },

               isAlreadyEnrolled:{
                 $in:['course._id',{
                    $map:{
                        input:"$enrolledcourses",
                        as:"enroll",
                        in:"$$enroll.course"

                    }
                }]
               }
            }
        },
        // state 7
        {
            $match:{
                isAlreadyEnrolled:false,
                preRequisiteFulField:true
            }

        }
        
    ]
    const  paginationQuery=[

        {
            $skip:skip
        },
        {
            $limit:limit
        }
    ]
    const result=await OfferedCourse.aggregate([...aggregationQuery,...paginationQuery]);
    const total=(await OfferedCourse.aggregate(aggregationQuery)).length;
    const totalPage=Math.ceil(result?.length/limit);

;
  

    return {
        meta:{
            page,limit,total,totalPage
        },
        result
    }


  }

export const OfferedCourseService={
    createOfferedCourseIntoDb,
    updateOfferedCourseIntoDb,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    getMyOfferedCoursesFromDB
}