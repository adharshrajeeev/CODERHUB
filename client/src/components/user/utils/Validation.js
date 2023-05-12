

export const validateEmail = (email)=>{
    return /\S+@\S+\.\S+/.test(email);
}

export const isValidateName = (name)=>{
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
}

export const isValidatePhoneNumber = (phoneNumber) =>{

    return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phoneNumber);
}


export const isValidateGender = (gender)=>{
    return /^(male|female|other)$/i.test(gender);
}

export const isValidatePassword = (password) =>{
    const regex = /^\d{5,}$/;
    return regex.test(password);
}