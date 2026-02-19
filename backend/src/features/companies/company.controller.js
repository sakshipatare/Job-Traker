import companyRepo from "./company.repository.js";

export default class companyController {

    constructor() {
        this.companyRepo = new companyRepo();
    }

    //  Create Company Profile
    async createCompany(req, res) {
        try {
            const { name, description, location, website } = req.body;

            const existingCompany = await this.companyRepo.getCompanyByUserId(req.user._id);
            if (existingCompany) {
                return res.status(400).json({ message: "Company profile already exists" });
            }

            const company = await this.companyRepo.createCompany({
                user: req.user._id,
                name,
                description,
                location,
                website
            });

            return res.status(201).json({ message: "Company profile created", company });
        } catch (err) {
            console.error("Create Company Error:", err);
            return res.status(500).json({ message: "Error creating company profile" });
        }
    }

    // 🔹 Get Company Profile
    async getProfile(req, res) {
        try {
            const company = await this.companyRepo.getCompanyByUserId(req.user._id);
            if (!company) return res.status(404).json({ message: "Company profile not found" });
            return res.status(200).json(company);
        } catch (err) {
            console.error("Get Company Error:", err);
            return res.status(500).json({ message: "Error fetching company profile" });
        }
    }

    // 🔹 Update Company Profile
    async updateProfile(req, res) {
        try {
            const updatedCompany = await this.companyRepo.updateCompany(req.user._id, req.body);
            return res.status(200).json({ message: "Company profile updated", company: updatedCompany });
        } catch (err) {
            console.error("Update Company Error:", err);
            return res.status(500).json({ message: "Error updating company profile" });
        }
    }

    // 🔹 List All Companies
    async listCompanies(req, res) {
        try {
            const companies = await this.companyRepo.getAllCompanies();
            return res.status(200).json(companies);
        } catch (err) {
            console.error("List Companies Error:", err);
            return res.status(500).json({ message: "Error fetching companies" });
        }
    }

}
