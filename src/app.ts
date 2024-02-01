import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandelar from './app/middlewere/globalErrorHandeling';
import notFound from './app/middlewere/notFound';
import router from './app/router';
import cookieParser from 'cookie-parser';
const app: Application = express();




//pearsse
//credentials:true ---> cookes access point in foends ends 
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:['http://localhost:5173'],credentials:true}));

app.get('/', (req: Request, res: Response) => {

  Promise.reject();
  res.send('Hello World!');
});

//application route

app.use('/api/v1', router);


//console.log(process.cwd());

// eslint-disable-next-line @typescript-eslint/no-explicit-any

//global error hannderl
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Not Found Router Error 
app.use(notFound);
app.use(globalErrorHandelar);

export default app;
