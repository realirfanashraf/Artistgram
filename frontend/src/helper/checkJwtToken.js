export function checkJWTToken() {
        const cookies = document.cookie;
        if (cookies.includes('jwtuser=')) {
            return true;
        } else {
            return false;
        }  
    } 

export function checkAdminJWTToken(){
        const cookies = document.cookie;
        if(cookies.includes('jwtadmin=')){
            return true
        }else{
            return false
        }
}