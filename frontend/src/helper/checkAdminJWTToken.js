import { Axios } from "../axios/adminInstance.js";

export async function checkAdminJWTToken() {
    const cookies = document.cookie;
    if (cookies.includes('jwtadmin=')) {
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
