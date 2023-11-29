
import { Schema, model } from "mongoose";
import { TUser } from "./user/user.interface";
import config from "../config";
import bcryp from 'bcrypt';




const TUserSchema=new Schema<TUser>({
    id:{type:String,required:[true,'ID is Required'],unique:true},
    password:{type:String,required:[true,'Password is Required']},
   needsPasswordChange:{type:Boolean,required:[true,'Ness Password Change is Required'] ,default:true},
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

export const User= model<TUser>('user',TUserSchema);
