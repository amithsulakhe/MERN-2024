const Contact = require("../db/models/contact-model");
const contactController = async (req, res) => {
  try {
    const data = req.body;
    const contacts = await Contact.create(data);
    res.status(201).json({ msg: "message sent successfully" });
  } catch (err) {
    res.status(400).josn({ msg: "something went wrong" });
  }
};

module.exports = contactController;
