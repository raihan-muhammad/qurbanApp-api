const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { signUp, signIn } = userController;

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
