const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/// middleware before creating user it will excutes

userSchema.pre("save", async function (next) {
  const user = this;

  // if password not modified it will go to next step
  if (!user.isModified("password")) {
    next();
  }

  // if it modified it comes to try and catch
  try {
    let salt_round = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt_round);
    user.password = hash_password;
  } catch (err) {
    next(err);
  }
});

// comparing password when user is login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// json web token =>authentication and authorisation important
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      // jwt payload or data
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      // second is signature
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const userData = mongoose.model("user", userSchema);

module.exports = userData;
