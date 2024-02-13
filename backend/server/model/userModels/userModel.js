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
    }
})

const userModel = mongoose.model('User', userSchema)

export default userModel;
