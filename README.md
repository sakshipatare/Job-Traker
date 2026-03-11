# 🚀 Job Tracker

A full-stack **Job Application Tracking System** that connects **students and companies** on a single platform.  
Students can search and apply for jobs, while companies can post jobs and manage applicants using **smart skill-matching and automated shortlisting**.

The system includes **authentication, resume management, job applications, notifications, analytics, and interview scheduling**, making it a complete recruitment workflow solution.

---

# 📌 Project Objective

The goal of this project is to simplify the hiring workflow by providing:

- A platform for **students to track job applications**
- A system for **companies to manage candidates**
- **Skill-based intelligent shortlisting**
- **Application status tracking**
- **Automated notifications and communication**

---

# 🔐 Authentication & Access Control

- Email signup with verification link
- Login allowed only after email verification
- Google authentication login
- Manual email/password login
- JWT-based authentication
- Protected routes
- Role-based dashboards (Student / Company)

---

# 👩‍🎓 Student Functionalities

## Profile Management

Students can manage their professional profile.

- Update personal details
- Upload profile photo
- Add or update skills
- Upload resume
- Update resume anytime
- Resume auto-update for previously applied jobs

---

## Job Application System

Students can interact with job opportunities.

- View all available job posts
- Apply to jobs
- Prevent duplicate applications
- Save jobs for later
- View job application deadlines

---

## Smart Skill Matching System

The platform automatically checks if a student's skills match the job requirements.
- match_percentage = (matched_skills / required_skills) * 100


System logic:

- **≥ 70% → Auto Shortlisted**
- **< 70% → Pending Review**

This helps companies prioritize candidates efficiently.

---

## Application Tracking

Students can track application progress.

Application statuses include:

- Pending
- Shortlisted
- Accepted
- Rejected

Features:

- Real-time status updates
- Dashboard notifications
- Email notifications when status changes

---

# 🏢 Company Functionalities

## Company Profile

Companies can manage organization information.

- View company profile
- Update company details
- View total job posts
- View total applications received

---

## Job Management

Companies can create and manage job listings.

- Create job posts
- Add job description
- Add required skills
- Add salary or stipend
- Update job posts
- Delete job posts
- View only their own posted jobs

---

## Application Management

Companies can manage applicants.

- View applicants per job
- View student resumes
- View student profile details
- View skill match priority
- Update application status
- Delete applications

---

# 🔔 Notification & Email System

The platform includes automated communication features.

- Email verification during signup
- Email notification when application status changes
- In-app dashboard notifications

---

# ⚡ Advanced Features

Additional implemented features include:

- Resume synchronization across applications
- Skill-based automatic shortlisting
- Status color highlighting
- Data filtering based on logged-in user
- Role-based dashboard rendering
- Advanced job filters
- Resume preview
- Save job feature
- Application deadline tracking
- Student application analytics
- Chat system (student ↔ company communication)
- Offer letter generator
- Skill suggestions & tags
- Interview scheduling system

---

# 🛠 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- Recharts

---

## Backend

- Node.js
- Express.js
- JWT Authentication

---

## Database

- MongoDB
- Mongoose ODM

---

## File Storage

- Multer (resume and profile upload)

---

## External Services

- Google OAuth (Login)
- Email Service (verification & notifications)

---

# 🏗 Project Architecture

```bash
Frontend (React)
|
| REST API
v
Backend (Node.js / Express)
|
| Authentication (JWT)
v
MongoDB Database
```

---

# ⚙ Installation Guide

## 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

## 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

## 3️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

## 4️⃣ Setup Environment Variables
Create a .env file in the backend folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## 5️⃣ Run Backend
```bash
npm run dev
```

## 6️⃣ Run Frontend
```bash
npm start
```

# 🔮 Future Improvements
## Possible future enhancements:
- AI-based resume analysis
- Job recommendation system
- Multi-company interview panels
- Mobile application
- Real-time messaging with WebSockets
- AI candidate ranking system

# 👩‍💻 Author

**Sakshi Patare
Full Stack Developer**

