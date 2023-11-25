import { z } from "zod";

const TUserValidationSchema = z.object({
  password: z.string({invalid_type_error:'Password must be String'}).min(1).max(20).optional(),
 
  
});

export const UserValidation={
    TUserValidationSchema
}