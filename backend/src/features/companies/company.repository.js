import { Company } from "./company.schema.js";

export default class companyRepo {

    async createCompany(data) {
        try {
            const newCompany = new Company(data);
            await newCompany.save();
            return newCompany;
        } catch (err) {
            console.error("Error creating company:", err);
            throw err;
        }
    }

    async getCompanyByUserId(userId) {
        try {
            return await Company.findOne({ user: userId });
        } catch (err) {
            console.error("Error fetching company by userId:", err);
            throw err;
        }
    }

    async updateCompany(userId, data) {
        try {
            return await Company.findOneAndUpdate(
                { user: userId },
                data,
                { new: true } // always return updated document
            );
        } catch (err) {
            console.error("Error updating company:", err);
            throw err;
        }
    }

    async getAllCompanies() {
        try {
            return await Company.find();
        } catch (err) {
            console.error("Error fetching companies:", err);
            throw err;
        }
    }

}
