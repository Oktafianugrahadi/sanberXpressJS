import express from "express";
import categoriesController from "./controllers/categories.controller";
import productController from "./controllers/product.controller";

const router = express.Router();

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.get("/products", productController.findAll);
router.post("/products", productController.create);
router.get("/products/:id", productController.findOne);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

export default router;
