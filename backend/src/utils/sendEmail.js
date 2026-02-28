import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail app password
  },
});

export const sendVerificationEmail = async (email, token) => {
  try {
    const verifyUrl = `${
      process.env.BACKEND_URL || "http://localhost:4000"
    }/users/verify/${token}`;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email for Job Apply",
      html: `
        <h3>Email Verification</h3>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyUrl}">Verify Email</a>
      `,
    });

    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("sendVerificationEmail error:", err);
    throw err;
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  try {
    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password/${token}`;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    console.log("Reset password email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("sendResetPasswordEmail error:", err);
    throw err;
  }
};

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("sendEmail error:", err);
    throw err;
  }
};