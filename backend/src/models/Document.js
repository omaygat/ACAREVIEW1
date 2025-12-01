import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  title: { type: String, default: "Sin título" },
  filename: String,
  text: { type: String, required: true },
  summary: String,
  grammar: {
    correctedText: String,
    errors: { type: Number, default: 0 },
    corrections: { type: Array, default: [] }
  },
  citations: {
    apa: { type: [String], default: [] },
    ieee: { type: [String], default: [] }
  },
  plagiarism: {
    matches: { type: Array, default: [] } // [{docId, similarity, title}]
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Document", DocumentSchema);
