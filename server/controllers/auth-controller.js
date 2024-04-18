const userData = require("../db/models/collection");

const home = async (req, res) => {
  try {
    const data = await userData.find({});
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).send(err);
  }
};

const register = async (req, res) => {
  try {
    const { userName, email, password, isAdmin, phone } = req.body;
    const userExists = await userData.findOne({ email });
    if (userExists) {
      return res.status(400).json({ email: "email already exists" });
    }
    const userCreated = await userData.create({ userName, phone, email, password, isAdmin });
    res.status(201).json({ msg: "registration successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString() });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExits = await userData.findOne({ email });
    if (!userExits) {
      return res.status(400).send({ msg: "Invalid credentials" });
    }
    const user = await userExits.comparePassword(password);

    if (user) {
      res.status(200).send({ msg: "Login successfull", token: await userExits.generateToken(), userId: userExits._id.toString() });
    } else {
      res.status(400).send({ msg: "Invalid user or password" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).send({ msg: userData });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userData.findOne({ _id: id }, { password: 0 });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedUser = await userData.updateOne({ _id: id }, { $set: updateData });
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = { home, register, login, user, getUserByID, updateUserById };
