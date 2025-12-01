import PDFDocument from "pdfkit";
import { nanoid } from "nanoid";
import fs from "fs";

export const generatePDF = async (req, res) => {
  try {
    const { text, result } = req.body;

    const doc = new PDFDocument();
    const filename = `reporte_${nanoid()}.pdf`;
    const filePath = `./temp/${filename}`;
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text("Reporte de Análisis Académico", { underline: true });
    doc.moveDown();

    doc.fontSize(12).text("Texto analizado:");
    doc.text(text);
    doc.moveDown();

    doc.fontSize(14).text("Resumen:");
    doc.fontSize(12).text(result.summary);
    doc.moveDown();

    doc.fontSize(14).text("Corrección Ortográfica:");
    doc.fontSize(12).text(result.correctedText);
    doc.moveDown();

    doc.fontSize(14).text("Citas APA/IEEE:");
    doc.fontSize(12).text(JSON.stringify(result.citations, null, 2));
    doc.moveDown();

    doc.fontSize(14).text("Plagio:");
    doc.fontSize(12).text(result.plagiarism.join(", ") || "Ninguno");
    doc.end();

    stream.on("finish", () => {
      res.download(filePath, filename, () => {
        fs.unlinkSync(filePath);
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando PDF" });
  }
};
