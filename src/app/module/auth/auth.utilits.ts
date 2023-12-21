import jwt, { JwtPayload } from 'jsonwebtoken';


export const vificationToken=(token:string ,scret:string)=>{
    const decoded = jwt.verify(token, scret) as JwtPayload;
    return decoded
}