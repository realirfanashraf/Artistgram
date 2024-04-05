import jwt from 'jsonwebtoken'

export const generateTokenUser = async (res, userId,email) => {

    const token = jwt.sign({ userId,email }, process.env.JWT_secretKey,
        {
            expiresIn: '1d'
        });

    res.cookie('jwtuser', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        secure: true,
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

}

export const generateTokenAdmin = async (res, adminId,email) => {
    const token = jwt.sign({ adminId ,email}, process.env.JWT_secretKey_ADMIN, {
        expiresIn: '1d'
    })
    res.cookie('jwtadmin', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        secure: true,
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}