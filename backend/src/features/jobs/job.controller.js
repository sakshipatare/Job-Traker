import jobRepo from "./job.repository.js";

export default class jobController {
    constructor() {
        this.jobRepo = new jobRepo();
    }

    async createJob(req, res) {
        try {
            const data = { ...req.body, company: req.user._id };
            const job = await this.jobRepo.createJob(data);
            return res.status(201).json({ message: "Job created", job });
        } catch (err) {
            console.error("Create Job Error:", err);
            return res.status(500).json({ message: "Error creating job" });
        }
    }

    async getAllJobs(req, res) {
        try {
            const jobs = await this.jobRepo.getJobs();
            return res.status(200).json(jobs);
        } catch (err) {
            console.error("Get Jobs Error:", err);
            return res.status(500).json({ message: "Error fetching jobs" });
        }
    }

    async getJob(req, res) {
        try {
            const job = await this.jobRepo.getJobById(req.params.jobId);
            if (!job) return res.status(404).json({ message: "Job not found" });
            return res.status(200).json(job);
        } catch (err) {
            console.error("Get Job Error:", err);
            return res.status(500).json({ message: "Error fetching job" });
        }
    }

    async updateJob(req, res) {
        try {
            const job = await this.jobRepo.updateJob(req.params.jobId, req.body);
            return res.status(200).json({ message: "Job updated", job });
        } catch (err) {
            console.error("Update Job Error:", err);
            return res.status(500).json({ message: "Error updating job" });
        }
    }

    async deleteJob(req, res) {
        try {
            await this.jobRepo.deleteJob(req.params.jobId);
            return res.status(200).json({ message: "Job deleted" });
        } catch (err) {
            console.error("Delete Job Error:", err);
            return res.status(500).json({ message: "Error deleting job" });
        }
    }
}
