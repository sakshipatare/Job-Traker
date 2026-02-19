import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["student", "company"],
        required: true
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

export {userSchema};