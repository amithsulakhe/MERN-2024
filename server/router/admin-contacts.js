const express = require("express");
const router = express.Router();
const getAllConatacts = require("../controllers/admin-contacts");
const authMiddleware = require("../middlewares/auth-middleware");

// auth middleware used for token varification

router.route("/contacts").get(authMiddleware, getAllConatacts);

module.exports = router;
