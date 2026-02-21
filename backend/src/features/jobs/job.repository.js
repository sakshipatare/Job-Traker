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

    async getJobsWithPagination({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
        filters = {}        // ✅ NEW
    }) {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        // ✅ Use filters
        const jobs = await Job.find(filters)
            .populate("company")
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        // ✅ Count with filters
        const total = await Job.countDocuments(filters);

        return {
            jobs,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}
