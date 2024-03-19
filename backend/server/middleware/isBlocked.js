import userSchema from "../model/userModels/userModel.js";

const isBlocked = async (req, res, next) => {
    try {
        const { email } = req.query;
        const user = await userSchema.findOne({ email });

        if (user && user.isBlocked) {
            res.clearCookie('jwtuser');
        }
        next();
    } catch (error) {
       console.log(error)
       next()
    }
};

export default isBlocked;
