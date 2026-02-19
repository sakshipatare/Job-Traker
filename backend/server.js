import express from "express";
import { connectUsingMongoose } from "./src/config/db.js";
import userRoutes from "./src/features/users/user.routes.js";
import studentRoutes from "./src/features/students/student.routes.js";
import companyRoute from "./src/features/companies/company.routes.js";
import jobRoutes from "./src/features/jobs/job.routes.js";
import applicationRoute from "./src/features/applications/application.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect DB
connectUsingMongoose();

// Routes
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/companies", companyRoute);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoute);

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
