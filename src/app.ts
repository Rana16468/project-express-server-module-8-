import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandelar from './app/middlewere/globalErrorHandeling';
import notFound from './app/middlewere/notFound';
import router from './app/router';
const app: Application = express();




//pearsse
app.use(express.json());
app.use(cors());

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
