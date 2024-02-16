export function checkJWTToken() {
        const cookies = document.cookie;
        if (cookies.includes('jwtuser=')) {
            return true;
        } else {
            return false;
        }  
    } 