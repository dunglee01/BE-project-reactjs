import express from "express";
import { createProduct, getProduct } from "../controller/product.js";

const router = express.Router();

router.post('/product', createProduct)
router.get('/product', getProduct)

export default router