import express from "express";
import { connectUsingMongoose } from "./src/config/db.js";
import userRoutes from "./src/features/users/user.routes.js";
import studentRoutes from "./src/features/students/student.routes.js";
import companyRoute from "./src/features/companies/company.routes.js";
import jobRoutes from "./src/features/jobs/job.routes.js";
import applicationRoute from "./src/features/applications/application.routes.js";
import notificationRouter from "./src/features/notifications/notification.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import helmet from "helmet";
// import express from "express";
import path from "path";
// import logger from "./src/utils/logger.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// Swagger Configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Tracker API",
      version: "1.0.0",
      description: "API documentation for Job Tracking Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
  },
  apis: ["./src/features/**/*.js"], // This tells Swagger where to read comments
};

const specs = swaggerJsdoc(options);

// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// app.use((req, res, next) => {
//     logger.info({
//         message: "Incoming request",
//         method: req.method,
//         url: req.url,
//         ip: req.ip
//     });
//     next();
// });

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"], // Vite frontend
//     credentials: true,
//   })
// );

// app.use(cors());


// Middlewares
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// Connect DB
connectUsingMongoose();

app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});
// Routes
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/companies", companyRoute);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoute);
app.use("/notifications", notificationRouter);

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
