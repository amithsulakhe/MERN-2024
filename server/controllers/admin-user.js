const Users = require("../db/models/collection");
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({}, { password: 0 });
    if (!users || users.length == 0) {
      return res.status(404).json({ msg: "No users  found" });
    }
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(400).json({ msg: "failed to get data" });
  }
};

module.exports = getAllUsers;
