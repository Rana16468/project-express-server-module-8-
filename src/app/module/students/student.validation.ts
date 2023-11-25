import Joi from 'joi';

 //creating a schema validation using a joi
 const nameSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .regex(/^[A-Z][a-z]*$/)
      .message('{VALUE} is not in capitalized format'),
    middleName: Joi.string().allow(''),
    lastName: Joi.string()
      .required().pattern(/^[A-Za-z]+$/,'alpha').message('{VALUE} is not valide')
      
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherContractNo: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContractNo: Joi.string().required(),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contractNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Define the main student schema
  const studentSchema = Joi.object({
    id: Joi.string().required(),
    name: nameSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.string(),
    contractNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    isActive: Joi.string().valid('active', 'inActive').default('active'),
    profileImg: Joi.string().allow(''),
    localGuardian: localGuardianSchema.required(),
  });

  export default studentSchema;
