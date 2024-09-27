import express from "express";
import upload from "../middleware/multer";

const task = require("../controllers/task");
const authenticateJWT = require("../middleware/authenticateJWT");
const chatImport = require('../controllers/chatImport')

const router = express.Router();

router.get("/task", authenticateJWT, task);
router.post("/import", authenticateJWT, upload.single("file"), chatImport);

export default router;
