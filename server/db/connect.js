// creating database and connecting to it

const mongoose = require("mongoose");
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
