import express from "express";
import multer from "multer";
import { analyzeText } from "../controllers/analiza_control.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//router.post("/analyze-file", upload.single("file"), analyzeFile);
router.post("/", analyzeText);


export default router;
