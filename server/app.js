const express = require("express");
const userRouter = require("./routes/userRouter.js");

const app = express();

app.use(express.json());

app.use("api/v1/users", userRouter);

module.exports = app;
