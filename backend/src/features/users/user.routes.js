import express from 'express';
import jwt from 'jsonwebtoken';
import userController from './user.controller.js';
import { userModel } from './user.repository.js';
import { authMiddleware } from "../../middleware/authentication.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and profile management
 */

const userRouter = express.Router();
const UserController = new userController();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
userRouter.post('/signup', (req, res, next) => {
    UserController.signUp(req, res, next);
});

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

userRouter.post('/signin', (req, res, next) => {
    UserController.signIn(req, res, next);
});

userRouter.post("/google-signin", (req, res, next) => {
  UserController.googleSignIn(req, res, next);
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
// user.routes.js
userRouter.get("/me", authMiddleware, (req, res, next) => {
    UserController.getUserProfile(req, res, next);
});

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Send reset password email
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Reset email sent
 */

userRouter.post("/forgot-password", (req, res) => {
    UserController.forgotPassword(req, res);
});

/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */

userRouter.post("/reset-password/:token", (req, res) => {
    UserController.resetPassword(req, res);
});

/**
 * @swagger
 * /users/verify/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */

//  Email Verification Route
userRouter.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET); // Match the secret used in signUp
        const user = await userModel.findOne({ email });

        if (!user) return res.status(400).send('User not found');
        if (user.verified) return res.status(200).send('Already verified');

        user.verified = true;
        await user.save();

        // Optional: Redirect to your frontend or card dashboard
        return res.status(200).send('=> Email verified! You can now access the Chatbot.');
    } catch (err) {
        console.error(err);
        return res.status(400).send('! Invalid or expired token');
    }
});

userRouter.get('/test', (req, res) => {
  res.send("Backend is connected");
});


export default userRouter;