import {z} from 'zod';

const createAcademicDepartmentValidationSchema=z.object({

    body:z.object({
        name:z.string({invalid_type_error:'Department Name Must Be Added',required_error:'name is Required'}),
        academicFaculty:z.string()
    })
});

const UpdateAcademicDepertmentValidaionSchema=z.object({
    body:z.object({
        name:z.string({invalid_type_error:'Department Name Must Be Added',required_error:'name is Required'}).optional(),
        academicFaculty:z.string().optional()
    })
})


export const AcademicDepartmentValidation={
    createAcademicDepartmentValidationSchema,
    UpdateAcademicDepertmentValidaionSchema
}