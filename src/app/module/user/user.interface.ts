/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{

    id:string;
    password:string;
    email:string;
    needsPasswordChange:boolean;
    passwordChangedAt?: Date;
    role:'admin' | 'user' | 'faculty' | 'superAdmin';
    status:'in-progress' | 'blocked';
    isDeleted:boolean;

}
export interface UserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExistByCustomId(id:string):Promise<TUser>,
    // eslint-disable-next-line no-unused-vars
    isPasswordMatched(plainTextPassword:string,hashPassword:string):Promise<boolean>,
    isJWTIssuesBeforePasswordChange(passwordChangeTimestamp:Date,jwtIssuesTime:number):Promise<boolean>
  
  }
  export type TUserRole=keyof typeof USER_ROLE;

