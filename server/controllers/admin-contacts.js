const Contacts = require("../db/models/contact-model");
const getAllConatacts = async (req, res) => {
  try {
    const contacts = await Contacts.find({}, { password: 0 });
    if (!contacts || contacts.length == 0) {
      return res.status(404).json({ msg: "No contacts found" });
    }
    res.status(200).json({ data: contacts });
  } catch (err) {
    res.status(400).json({ msg: "failed to get data" });
  }
};

module.exports = getAllConatacts;
