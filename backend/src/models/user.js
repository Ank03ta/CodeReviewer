import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min:6,
    }
})

const User = mongoose.model('User',userSchema)

export default User;