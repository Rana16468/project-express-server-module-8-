

import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user/user.interface";
import config from "../config";
import bcryp from 'bcrypt';
import bcrypt from 'bcrypt';



const TUserSchema=new Schema<TUser,UserModel>({
    id:{type:String,required:[true,'ID is Required'],unique:true},
    password:{type:String,required:[true,'Password is Required'],select:0},
    email:{type:String,required:[true,'Email is Required']},
   needsPasswordChange:{type:Boolean,required:[true,'Ness Password Change is Required'] ,default:true},
   passwordChangedAt: {
    type: Date,
    required:[false,'Password Change At Is Not Required']
  },
   role:{
    type:String,
    enum:{
        values:['admin', 'user' ,'faculty'],
        message:'{VALUE} is Not Required'
    }
   },
   status:{
    type:String,
    enum:{
        values:['in-progress' , 'blocked'],
        message:'{VALUE} is Not Required'
    },
    default:'in-progress'
   },
   isDeleted:{type:Boolean,required:[true,'is Deleted is Requires'],default:false}


},{
    timestamps:true  //createAt 

});

//pre save maddile ware // hook : will work no create fuction 
TUserSchema.pre('save', async function(next){

    // hasing pawword sand save into db
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user=this;
   
    user.password=await bcryp.hash(user.password,Number(config.byrypt_salt_rounds));
    next();
  
  });
  //post save middleware hook
  TUserSchema.post('save',function(doc,next){
    doc.password='';
    // after the save the password is empy becouse of security issues
    next();
  });

  TUserSchema.statics.isUserExistByCustomId=async function(id:string)
  {

    return await User.findOne({id}).select('+password');
  }
  TUserSchema.statics.isPasswordMatched=async function(plainTextPassword:string,hashPassword:string)
  {
    const isPasswordMatch=await bcrypt.compare(plainTextPassword,hashPassword);
    return isPasswordMatch;
  }
  TUserSchema.statics.isJWTIssuesBeforePasswordChange=async function(passwordChangeTimestamp:Date,jwtIssuesTime:number)
  {

    const passwordChangeTime= new Date(passwordChangeTimestamp).getTime()/1000
    return passwordChangeTime>jwtIssuesTime

  }

export const User= model<TUser,UserModel>('user',TUserSchema);
