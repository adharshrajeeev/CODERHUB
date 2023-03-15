import Joi from "joi";


export const signupValidate=(data)=>{
    const Schema=Joi.object({
        userName:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required(),
        phoneNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        dateOfBirth:Joi.date().required(),
        gender:Joi.string().required()
    });
    return Schema.validate(data)
}


export default signupValidate