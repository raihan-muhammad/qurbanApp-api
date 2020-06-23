const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const userController = require("../controllers/userController");

const { requireLogin } = userController;
const { createStock, getAllStocks, updateStock } = stockController;

router.route("/").get(getAllStocks).post(requireLogin, createStock);
router.route("/:id").patch(requireLogin, updateStock);

module.exports = router;
