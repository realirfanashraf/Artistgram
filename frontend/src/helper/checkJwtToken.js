import { Axios } from "../axios/userInstance";

export async function checkJWTToken() {
    const cookies = document.cookie;
    if (cookies.includes('jwtuser=')) {
        try {
            const response = await Axios.get('/verifyToken', { withCredentials: true });
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.error('Error checking JWT token:', error);
            return false;
        }
    }
    return false; 
}




export function checkAdminJWTToken(){
        const cookies = document.cookie;
        if(cookies.includes('jwtadmin=')){
            return true
        }else{
            return false
        }
}