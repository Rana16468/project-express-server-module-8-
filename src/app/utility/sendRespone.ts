import { Response } from "express";
type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };

 type TResponeData<T>={
    statusCode:number;
    success:boolean;
    message:string;
    meta?:TMeta
    data:T
}

const sendRespone=<T>(res:Response,data:TResponeData<T>)=>{
res.status(data.statusCode).send({success:data.success,message:data.message,meta:data?.meta,data:data.data});


}

export default sendRespone;