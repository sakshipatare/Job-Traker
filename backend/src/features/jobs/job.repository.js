import { Job } from "./job.schema.js";

export default class jobRepo {

    async createJob(data) {
        const job = new Job(data);
        return await job.save();
    }

    async getJobs() {
        return await Job.find().populate("company");
    }

    async getJobById(jobId) {
        return await Job.findById(jobId).populate("company");
    }

    async updateJob(jobId, data) {
        return await Job.findByIdAndUpdate(jobId, data, { new: true });
    }

    async deleteJob(jobId) {
        return await Job.findByIdAndDelete(jobId);
    }

    async getJobsByCompany(companyId) {
        return await Job.find({ company: companyId });
    }
}
