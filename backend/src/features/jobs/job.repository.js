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
        filters = {}
    }) {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const jobs = await Job.find(filters)
            .select("title location salary company createdAt")
            .populate("company", "name")
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean();   //  optimization

        const total = await Job.countDocuments(filters);

        return {
            jobs,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}
