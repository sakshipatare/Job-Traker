 import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user account
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    website: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Company = mongoose.model("Company", companySchema);
