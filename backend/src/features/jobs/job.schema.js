import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

jobSchema.pre("save", function () {
  this.createdAt = new Date();
});


export const Job = mongoose.model("Job", jobSchema);
