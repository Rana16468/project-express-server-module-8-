import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouters } from './app/module/students/student.router';
const app: Application = express();

//pearsse
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//application route

app.use('/api/v1/students', StudentRouters);

//console.log(process.cwd());

export default app;
