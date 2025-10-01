const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// Protected routes (require JWT)
// GET /users/list
router.get("/list", authMiddleware, userController.getAllUsers);
// POST /users/add
// router.post("/add", authMiddleware, userController.addUser);

// POST /users/signup
router.post("/signup", userController.signUp);

// POST /users/signin
router.post("/signin", userController.signIn);

// POST /users/change-password
router.post("/change-password", authMiddleware, userController.changePassword);

module.exports = router;
