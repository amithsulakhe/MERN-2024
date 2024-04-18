const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const router = require("./router/app-router");
const contactRouter = require("./router/contact-router");
require("dotenv").config();
const connectDB = require("./db/connect");
const errorMiddleware = require("./middlewares/error-middleware");
const getAllUsersRouter = require("./router/admin-router");
const getAllContactsRouter = require("./router/admin-contacts");
const deleteUser = require("./router/admin-Delete-User");

//middleware in which application allows json data
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentialS: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// middleware
app.use("/auth/api", router);

// error middleware
app.use(errorMiddleware);

// middleware for contact page
app.use("/auth/api", contactRouter);

//middleware for getting users
app.use("/auth/api/admin", getAllUsersRouter);

//middleware for getting contacts
app.use("/auth/api/admin", getAllContactsRouter);

app.use("/auth/api/admin", deleteUser);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to home page");
});

app.get("/register", (req, res) => {
  res.status(200).send("Welcome to Registration page");
});

const start = async () => {
  await connectDB(process.env.MONGO_DB);
  app.listen(PORT, () => {
    console.log("connected to server port " + PORT);
  });
};
start();
