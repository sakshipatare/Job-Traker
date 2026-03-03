import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateOfferLetter = (application) => {
  return new Promise((resolve, reject) => {
    try {
      const folderPath = path.join("uploads", "offers");
      fs.mkdirSync(folderPath, { recursive: true });

      const fileName = `Offer_${application._id}.pdf`;
      const filePath = path.join(folderPath, fileName);

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Header
      doc.fontSize(20).text("Offer Letter", { align: "center" });
      doc.moveDown();

      // Body
      doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.text(`Dear ${application.student.user.name},`);
      doc.moveDown();

      doc.text(
        `We are pleased to inform you that you have been selected for the position of ${application.job.title} at ${application.job.company.name}.`
      );

      doc.moveDown();
      doc.text("We look forward to working with you.");
      doc.moveDown(2);

      doc.text("Sincerely,");
      doc.text(application.job.company.name);

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};