const express = require("express");
const route = express.Router();
const authenticateJWT = require("../middleware/authenticateJWT");
const chatImport = require("../controllers/chatImport");
const task = require("../controllers/task");
const upload = require("../middleware/multer");

route.get("/task", authenticateJWT, task);
route.post("/import", authenticateJWT, upload.single("file"), chatImport);

module.exports = route;
