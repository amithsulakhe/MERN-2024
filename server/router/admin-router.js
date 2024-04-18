const express = require("express");
const router = express.Router();
const getAllUsers = require("../controllers/admin-user");
const authMiddleware = require("../middlewares/auth-middleware");
const authControllers = require("../controllers/auth-controller");
const adminMiddleware = require("../middlewares/admin-middleware");
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

router.route("/users/:id").get(authMiddleware, authControllers.getUserByID);
router.route("/users/update/:id").patch(authMiddleware, authControllers.updateUserById);

module.exports = router;
