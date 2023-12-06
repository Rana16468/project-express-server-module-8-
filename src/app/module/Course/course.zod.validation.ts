import { z } from 'zod';

const TPreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
}).optional();

const createTCourseValidationSchema = z.object({
 body:z.object({
    title: z.string().min(1, { message: 'Course title is required' }),
    prefix: z.string().min(1, { message: 'Course prefix is required' }),
    code: z.number().int().positive({ message: 'Course code must be a positive integer' }),
    credits: z.number().int().positive({ message: 'Credits must be a positive integer' }),
    preRequisiteCourses: z.array(TPreRequisiteCoursesValidationSchema).default([]).optional(),
    isDeleted:z.boolean().optional()
})
});

// update  validation

  
  const updateTCourseValidationSchema = createTCourseValidationSchema.partial();
// coure Faculty validation 
const createTCourseFacultyValidationSchema = z.object({
  body:z.object({

    faculties: z.array(z.string().refine(data => data.trim() !== "", { message: 'Faculty is Required' }))
       
  })
  });

export const CourseValidation={
createTCourseValidationSchema,
updateTCourseValidationSchema,
createTCourseFacultyValidationSchema 
}


