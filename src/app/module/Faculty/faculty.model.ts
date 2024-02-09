import { Schema, model } from "mongoose";
import { TFaculty, TFacultyGuirdian, TFacultyName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";



const TFacultyName= new Schema<TFacultyName>({
    firstName:{type:String,required:[true,'First Name is Required']},
    middleName:{type:String,required:[false,'Middle Name is Required']},
    lastName:{type:String,required:[true,'Last Name is Required']}
});

const TFacultyGuirdianSchema=new Schema<TFacultyGuirdian>({
    fatherName:{type:String,required:[true,'Father Name is Required']},
    fatherOccupation:{type:String,required:[true,'Father Occupation is Required']},
    fatherContactNo:{type:String,required:[true,'Father Contract No is Required']},
    motherName:{type:String,required:[true,'Mother Name is Required']},
    motherOccupation:{type:String,required:[true,'Mother Occupation is Required']},
    motherContactNo:{type:String,required:[true,'Mother Contract No is Required']}
})

const TFacultySchema= new Schema<TFaculty>({
    id:{type:String,required:[true,'Id is Required'],unique:true},
    user:{type:Schema.Types.ObjectId,required:[true,'User is Required'],ref:'User'},
    name:{type:TFacultyName,required:[true,'Name is Required']},
    designation:{type:String,required:[true,'Designation is Required']},
    email:{type:String,unique:true,trim:true,required:[true,'Email is Required']},
    gender:{type:String,enum:{values:Gender,message:'{VALUE} is Not Required'},required:[true,'Gender is Required']},
    bloogGroup:{type:String,enum:{values:BloodGroup,message:'{VALUE} is Not Required'},required:[true,'BloodGroup is Required']},
    dateOfBirth:{type:String,required:[true,'Date Of Birth is Required']},
    contractNo:{type:String,required:[true,'Contract Number is Required']},
    emergencyContractNo:{type:String,required:[true,'Emergency Contract Number is Required']},
    presentAddress:{type:String,required:[true,'Present Address is Required']},
    permanentAddress:{type:String,required:[true,'PermanentAddress is Required']},
    guirdian:{type:TFacultyGuirdianSchema,required:[true,'Guirdian is Required']},
    academicDepartment:{type:Schema.Types.ObjectId,required:[true,'Academic Department is Required'], ref:"AcademicDepartment"},
    profileImg:{type:String,required:[false,'Profile Image is Required'],default:''},
    academicFaculty:{type:Schema.Types.ObjectId,required:[true,'Academic Faculty is Required'],ref:"AcademicFaculty"},
    isDeleted:{type:Boolean,required:[false,'is Deleted is Required'],default:false}

},{
    timestamps:true
});

// middle were 

TFacultySchema.pre('find',async function(next){

    this.find({isDeleted:{$ne:true}})

    next();
});
TFacultySchema.pre('findOne',async function(next){
    this.findOne({isDeleted:{$ne:true}})
    next()
});
TFacultySchema.pre('aggregate',async function(next){
    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})

    next();
});



export const Faculty= model<TFaculty>('Faculty',TFacultySchema);