


import { z } from 'zod';
import { AcademicSemesterName, AcademicSemesterCode,months } from './academicSemester.constance';




// Zod validation schema for TAcademicSemester
const createAcademicSemesterValidationSchema = z.object({

    body:z.object({
        name:z.enum([...AcademicSemesterName] as [string, ...string[]]),
        code:z.enum([...AcademicSemesterCode] as [string,...string[]]),
        year:z.string(),
        startMonth:z.enum([...months] as [string,...string[]]),
        endMonth:z.enum([...months] as [string,...string[]])


    })
  
});

export const academicSemesterValidation={
    createAcademicSemesterValidationSchema
}