import jobRepo from "./job.repository.js";
import companyRepo from "../companies/company.repository.js";

export default class jobController {
    constructor() {
        this.jobRepo = new jobRepo();
    }

    async createJob(req, res) {
        try {
            const companyRepository = new companyRepo();

            // 🔥 Find company by logged-in user
            const company = await companyRepository.getCompanyByUserId(req.user._id);

            if (!company) {
                return res.status(404).json({ message: "Company profile not found" });
            }

            const data = {
                ...req.body,
                company: company._id   // 🔥 Correct company ID
            };

            const job = await this.jobRepo.createJob(data);

            return res.status(201).json({ message: "Job created", job });

        } catch (err) {
            console.error("Create Job Error:", err);
            return res.status(500).json({ message: "Error creating job" });
        }
    }

    async getAllJobs(req, res) {
    try {
        const { page, limit, sortBy, order, search, title, location, minSalary } = req.query;

        const filters = {};

        //  Search by title
        //  Global Search (title + location + salary)
        if (search) {
            filters.$or = [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];

            // If search is numeric → also match salary
            if (!isNaN(search)) {
                filters.$or.push({ salary: Number(search) });
            }
        }
        
        //  Text Search (if text index is used)

        // if (search) {
        //     filters.$text = { $search: search };
        // }

        if (title) {
            filters.title = { $regex: title, $options: "i" };
        }

        //  Filter by location
        if (location) {
            filters.location = { $regex: location, $options: "i" };
        }

        //  Filter by minimum salary
        if (minSalary) {
            filters.salary = { $gte: Number(minSalary) };
        }

        const data = await this.jobRepo.getJobsWithPagination({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sortBy: sortBy || "createdAt",
            order: order || "desc",
            filters
        });

        return res.status(200).json(data);

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
