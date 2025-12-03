import express from "express";
import { correctorLocalController } from "../controllers/correctorLocalController.js";

const router = express.Router();

router.post("/local", correctorLocalController);

export default router;
