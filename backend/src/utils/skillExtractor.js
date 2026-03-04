import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse"); // v1.1.1 works directly

const SKILL_KEYWORDS = [
  "javascript", "react", "node", "mongodb", "express",
  "python", "java", "c++", "html", "css",
  "sql", "aws", "docker", "git", "typescript"
];

export const parseResume = async (resumePath) => {
  try {
    const buffer = fs.readFileSync(resumePath);

    const data = await pdf(buffer);

    const text = data.text.toLowerCase();

    const escapeRegex = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const skills = SKILL_KEYWORDS.filter(skill => {
    const safeSkill = escapeRegex(skill);
    return new RegExp(`\\b${safeSkill}\\b`, "i").test(text);
    });

    const phoneRegex = /(\+91[\s-]?)?[6-9]\d{9}/g;
    const phoneMatch = text.match(phoneRegex);
    const phone = phoneMatch ? phoneMatch[0] : "";

    return { skills, phone };

  } catch (error) {
    console.error("Resume Parse Error:", error);
    return { skills: [], phone: "" };
  }
};