import jwt from 'jsonwebtoken'

export const generateTokenUser = async(res,userId) => {
    
    const token = jwt.sign({userId},process.env.JWT_secretKey,
        {
            expiresIn:'30d'
        });
   
        res.cookie('jwtuser', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            secure:true,
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

}