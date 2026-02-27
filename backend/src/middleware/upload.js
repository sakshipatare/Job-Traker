import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folders exist
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

createFolderIfNotExists("uploads/resumes");
createFolderIfNotExists("uploads/photos");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "resume") {
      cb(null, "uploads/resumes/");
    } 
    else if (file.fieldname === "profilePhoto") {
      cb(null, "uploads/photos/");
    } 
    else {
      cb(new Error("Invalid file field"));
    }
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Only PDF, DOC, DOCX allowed for resume"));
    }
  }

  if (file.fieldname === "profilePhoto") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed for profile photo"));
    }
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

//  Support BOTH files
export const uploadFiles = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 }
]);