import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './app/module/students/student.router';
import { UserRouter } from './app/module/user/user.router';
const app: Application = express();

//pearsse
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//application route

app.use('/api/v1/students', StudentRouters);
app.use('/api/v1/user',UserRouter);

//console.log(process.cwd());

// eslint-disable-next-line @typescript-eslint/no-explicit-any

//global error hannderl
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{

  return res.status(500).json({success:false,message:'some thing went wrong',err});
  next();
})

export default app;
