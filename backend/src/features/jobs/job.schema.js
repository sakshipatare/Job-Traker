import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: false },
    skills: [{
        type: String,
        required: true
    }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

//Query Optimization
jobSchema.index({ createdAt: -1 });
jobSchema.index({ company: 1 });
jobSchema.index({ salary: 1 });

// //  Text Index for fast search
// jobSchema.index({
//    title: "text",
//    location: "text",
//    description: "text"
// });

jobSchema.pre("save", function () {
  this.createdAt = new Date();
});


export const Job = mongoose.model("Job", jobSchema);
