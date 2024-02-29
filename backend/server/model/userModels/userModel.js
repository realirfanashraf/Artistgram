import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String
    },
    registrationDate: {
        type: Date,
        default: Date.now 
    },
    ProfilePicture:{
        type:String,
        default : 'https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png'
    }
})

const userModel = mongoose.model('User', userSchema)

export default userModel;
