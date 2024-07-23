import express from "express";
import { handleUpload } from "./utils/cloudinary";
import { single, multiple } from "./middlewares/upload.middleware";

const router = express.Router();

// Rute untuk upload satu file
router.post("/upload/single", single, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { buffer, originalname } = req.file;
    const result = await handleUpload(buffer, originalname);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred.");
    }
  }
});

// Rute untuk upload beberapa file
router.post("/upload/multiple", multiple, async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).send("No files uploaded.");
    }

    const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
      handleUpload(file.buffer, file.originalname)
    );
    const results = await Promise.all(uploadPromises);
    res.status(200).json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred.");
    }
  }
});

export default router;
