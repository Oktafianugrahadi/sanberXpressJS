import express from "express";
import categoriesController from "./controllers/categories.controller";
import authController from "./controllers/auth.controller";
import authMiddleware from "./middlewares/auth.middleware"; // Perbaiki penulisan path dan nama file

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authMiddleware, authController.me);
router.put("/auth/profile", authMiddleware, authController.profile);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

export default router;
