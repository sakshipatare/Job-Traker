import jwt from 'jsonwebtoken';
import logger from "../../utils/logger.js";
import userRepo from './user.repository.js';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail, sendResetPasswordEmail } from '../../utils/sendEmail.js';
import { Student } from "../students/student.schema.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default class userController {
    constructor(){
        this.userRepo = new userRepo();
    }

    async signUp(req, res, next) {
    const { name, email, password, role } = req.body;

    try {
        if (!role || !["student", "company"].includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await this.userRepo.signUp({
            name,
            email,
            password: hashedPassword,
            role
        });

        if (!newUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //  Auto create student profile
        if (role === "student") {
            await Student.create({ user: newUser._id });
        }

        // Generate verification token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        await sendVerificationEmail(email, token);

        logger.info({
            message: "User registered successfully",
            email,
            role
        });

        return res.status(201).json({
            message: "Verification email sent!"
        });

    } catch (err) {
        logger.error({
            message: "SignUp controller error",
            error: err.message,
        });
        return res.status(500).json({ message: "Error in signing up user" });
    }
}


    async signIn(req, res, next){
        try{
            logger.info({
                message: "SignIn attempt",
                email: req.body.email
            });
            const { email, password } = req.body;
            const user = await this.userRepo.signIn(email);

            console.log("User from DB: ", user); //  Safe now
            if (!user) {
                logger.warn({
                    message: "Login failed - user not found",
                    email
                });
                return res.status(401).json({message: 'Invalid email or password.'});
            }

            // console.log("Stored Pass: ", user.password); //  Safe now

            if (!user.password) {
                logger.warn({
                    message: "Login failed - incorrect password",
                    email
                });
                return res.status(401).json({message: 'Invalid email or password.'});
            }


            //  Add this check here
            if (!user.verified) {
            return res.status(403).json({ message: 'Please verify your email before signing in.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if(isValidPassword){
                const token = jwt.sign(
                    {
                        email: user.email,
                        id: user.id,
                        role: user.role   
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' }
                );

                // Remove password from user object before sending
                const { password, ...userWithoutPassword } = user._doc;

                logger.info({
                    message: "User logged in successfully",
                    email: user.email,
                    role: user.role
                });

                return res.status(200).json({message: 'User logged in successfully', token, user: userWithoutPassword, });
            }else{
                return res.status(401).json({message: 'Invalid email or password..'});
            }
        }catch(err){
            logger.error({
                message: "SignIn controller error",
                error: err.message,
            });
            return res.status(500).json({message: 'Error signing in user'});
        }
    }

    async googleSignIn(req, res) {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let user = await this.userRepo.getUserByEmail(email);

    if (!user) {
      const hashedPassword = await bcrypt.hash("google_oauth_dummy", 10);

      user = await this.userRepo.signUp({
        name,
        email,
        password: hashedPassword,
        role: "student",
        verified: true,
      });

      await Student.create({ user: user._id });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return res.json({ token: jwtToken, user: userWithoutPassword });

  } catch (err) {
    logger.error({
      message: "Google Sign-In error",
      error: err.message,
    });

    return res.status(401).json({ message: "Invalid Google token" });
  }
}

    async getUserProfile(req, res){
        res.json({
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        });
        };


    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await this.userRepo.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const resetToken = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            await this.userRepo.updateResetToken(
                email,
                resetToken,
                Date.now() + 15 * 60 * 1000
            );

            await sendResetPasswordEmail(email, resetToken);

            return res.status(200).json({
                message: "Reset password link sent to your email"
            });

        } catch (err) {
            logger.error({
                message: "Forgot password error",
                error: err.message,
            });
            return res.status(500).json({ message: "Error sending reset link" });
        }
    }

    async resetPassword(req, res) {
        const { token } = req.params;
        const { password } = req.body;

        try {
            jwt.verify(token, process.env.JWT_SECRET);

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await this.userRepo.resetPassword(token, hashedPassword);

            if (!user) {
                return res.status(400).json({
                    message: "Invalid or expired token"
                });
            }

            
            return res.status(200).json({
                message: "Password reset successful"
            });

        } catch (err) {
            console.error("Reset password error:", err);
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }
    }


}