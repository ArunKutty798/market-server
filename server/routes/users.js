import express from "express";
import { signup, signin, createStore } from "../controllers/users.js";

import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  productDetails,
} from "../controllers/product.js";

const router = express.Router();
router.get("/product/:id", productDetails);

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/createstore", createStore);

router.get("/get_all_products", getAllProducts);
router.get("/get_user_products/:storename", getUserProducts);
router.post("/addproduct", addProduct);
router.patch("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

export default router;
