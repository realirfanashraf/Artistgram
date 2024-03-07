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

export const getPosts = (userId) => {
    return Axios.get(`/upload/posts/${userId}`);
};

export const logout = () => {
    return Axios.get('/logout');
};

export const changeProfilePicture = (email, imageUrl) => {
    return Axios.post('/upload/changeProfilePicture', { email, imageUrl });
};

export const forgotPassword = (email) => {
    return Axios.post('/forgotpassword', { email });
};

export const changePassword = async (email, newPassword) => {
   return await Axios.post('/changePassword', { email, newPassword });
};