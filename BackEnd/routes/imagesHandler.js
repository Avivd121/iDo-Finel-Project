// imagesHandler.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure multer storage (for now, local 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// Example POST route to upload an image
router.post("/upload", upload.single("image"), (req, res) => {
  const { page, section } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // You can insert file metadata into the DB here (not implemented yet)
  const fileInfo = {
    filename: req.file.filename,
    path: req.file.path,
    page,
    section,
  };

  console.log("Uploaded file info:", fileInfo);

  res.json({ message: "File uploaded successfully", file: fileInfo });
});

module.exports = router;
