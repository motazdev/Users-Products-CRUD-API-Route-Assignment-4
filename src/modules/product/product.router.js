
import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, prodsAverage, prodsGreaterThan, prodsWithOwners, updateProduct } from "./product.controller.js";
const router = Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
router.get("/", getAllProducts);
router.get("/greater-than", prodsGreaterThan);
router.get("/owners", prodsWithOwners);
router.get("/average", prodsAverage);

export default router;