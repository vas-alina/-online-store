const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const orderRouter = require("./order");
const cartRouter = require("./cart");
const favoritesRouter = require("./favorites");
const productRouter = require("./product");

const router = express.Router();

router.use("/auth", authRouter);  
router.use("/users", userRouter); 
router.use("/cart", cartRouter); 
router.use("/orders", orderRouter); 
router.use("/favorites", favoritesRouter); 
router.use("/products", productRouter); 

module.exports = router;