import express from "express";
import companyController from "./company.controller.js";
import { authMiddleware } from "../../middleware/authentication.js";
import { authorizeRole } from "../../middleware/roleAuthorization.js";

const companyRoute = express.Router();
const CompanyController = new companyController();

//  Create company profile → Only company role
companyRoute.post("/", authMiddleware, authorizeRole("company"), (req, res) => CompanyController.createCompany(req, res));

//  Get my company profile
companyRoute.get("/me", authMiddleware, authorizeRole("company"), (req, res) => CompanyController.getProfile(req, res));

//  Update my company profile
companyRoute.put("/me", authMiddleware, authorizeRole("company"), (req, res) => CompanyController.updateProfile(req, res));

//  List all companies → Accessible to everyone (students)
companyRoute.get("/", authMiddleware, authorizeRole("student", "company"), (req, res) => CompanyController.listCompanies(req, res));

companyRoute.get(
  "/stats",
  authMiddleware,
  authorizeRole("company"),
  (req, res) => CompanyController.getCompanyStats(req, res)
);

export default companyRoute;
