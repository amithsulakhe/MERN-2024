const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const Users = require("../db/models/collection");
const router = express.Router();

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.deleteOne({ _id: id });
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    res.status(401).json({ err });
  }
};

router.route("/delete/:id").delete(authMiddleware, deleteUser);

module.exports = router;
