const express = require("express");
const userRouter = require("./routes/userRouter.js");
const accountRouter = require("./routes/accountRouter.js");
const cardRouter = require("./routes/cardRouter.js");

const app = express();

app.use(express.json());

app.use("api/v1/users", userRouter);
app.use("api/v1/accounts", accountRouter);
app.use("api/v1/cards", cardRouter);

module.exports = app;
