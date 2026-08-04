import { Router } from "express";
import { ProductController } from "../controller/ProductController";

const router = Router();

router.get("/products", ProductController.getProducts);

export default router;