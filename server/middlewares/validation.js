import Joi from "joi";


export  const signupValidate=(data)=>{
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

export const userLoginValidate=(data)=>{
    const Schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required(),
    })
    return Schema.validate(data)
}


export const adminLoginValidate=(data)=>{
    const Schema=Joi.object({
        adminId:Joi.string().email().required(),
        adminPassword:Joi.string().min(5).required(),
    })
    return Schema.validate(data)
}


export const userBioValidation=(data)=>{
    const Schema=Joi.string({
        bio:Joi.string().required()
    })
    return Schema.validate(data)
}
