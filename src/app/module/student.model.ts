
import { Schema, model } from 'mongoose';
import {
  StudentModels,
  //StudentMethods,
  //StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,TUserName
} from './students/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //Mezba
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent,StudentModels>(
  {
    id:{type:String,required:[true,'Id Is Required']},
    user:{
    type:Schema.Types.ObjectId,
    required:[true,'User id is Required'],
    ref:'User'
  },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String,default:'' },
    admissionSemester:{
      type:Schema.Types.ObjectId,
      ref:'AcademicSemester',
      required:[true,'Addmission Semester is Required']
    },
    academicDepartment:{type:Schema.Types.ObjectId,
      ref:'AcademicDepartment',
      required:[true,'Addmission  Department is Required']},
      academicFaculty:{type:Schema.Types.ObjectId},
    isDeleted:{type:Boolean,default:false}
   
  },{
    toJSON:{
      virtuals:true
    }
  }
  
);



//QUERY MIDDLEWARE
studentSchema.pre('find',function(next){

  this.find({ isDeleted:{$ne:true}})

  next();
})
studentSchema.pre('aggregate',function(next){

  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next();
})

studentSchema.pre('findOne',function(next){

  this.find({ isDeleted:{$ne:true}})

  next();
})

// create static model 
studentSchema.statics.isUserExists=async function(id:string){

  const existingUser= await Student.findOne({id});
   return existingUser;


}


// create model
//https://mongoosejs.com/docs/typescript.html

// creating a custom instance method
/*studentSchema.methods.isUserExist= async function (id:string){
  const existingUser= await Student.findOne({id});
  return existingUser
}*/

//virtual 
studentSchema.virtual('fullName').get(function(){
  return this.name.firstName.concat(' ').concat(this.name.middleName).concat(' ').concat(this.name.lastName)
})

export const Student = model<TStudent,StudentModels>('Student', studentSchema);
