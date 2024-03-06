import { Axios } from "../axios/userInstance"

export const signIn =(formData)=>{
    return Axios.post('/signin', formData)
}

export const signup = (formData,verificationCode)=>{
    return Axios.post('/signup', formData,verificationCode)
}

export const signUpMail = (email)=>{
    return Axios.post('/signUpMail',{email})
}
