import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

export const userModel = mongoose.model('User', userSchema);

export default class userRepo {

    async signUp(user) {
    try {
        const existingUser = await userModel.findOne({ email: user.email });

        if (existingUser) {
            return null; // user already exists
        }

        const newUser = await userModel.create(user);
        return newUser; // 🔥 return actual user document

    } catch (err) {
        console.log("Creating user error:", err);
        throw err; // let controller handle error
    }
}


    async getUserByEmail(email){
        try{
            return await userModel.findOne({ email });
        }catch(err){
            console.log("Error! Getting user by email", err);
            return { message: "Error! Getting user by email", status: 500};
        }
    }

    async signIn(email){
        try{
            const user = await userModel.findOne({email}).select('+password');
            return user;
        }catch(err){
            console.log("Error on finding user: ", err);
            return null;
        }
    }

    async updateResetToken(email, token, expire) {
        return await userModel.findOneAndUpdate(
            { email },
            {
                resetPasswordToken: token,
                resetPasswordExpire: expire
            }
        );
    }

    async resetPassword(token, hashedPassword) {
        return await userModel.findOneAndUpdate(
            {
                resetPasswordToken: token,
                resetPasswordExpire: { $gt: Date.now() }
            },
            {
                password: hashedPassword,
                resetPasswordToken: undefined,
                resetPasswordExpire: undefined
            }
        );
    }

}