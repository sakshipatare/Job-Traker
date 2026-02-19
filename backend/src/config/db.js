import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = "mongodb://localhost:27017/job-apply";
// const url = process.env.MONGO_ATLAS;


export const connectUsingMongoose = async () => {
  try {
    if (!url) {
      throw new Error("MONGO_ATLAS is not defined in .env");
    }
    await mongoose.connect(url);  //  No extra options needed
    console.log("=> Connected to MongoDB");
    console.log("=> DB NAME:", mongoose.connection.name);
  } catch (err) {
    console.log("! Error connecting to MongoDB");
    console.log(err);
  }
};