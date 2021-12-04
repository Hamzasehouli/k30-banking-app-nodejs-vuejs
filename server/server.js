const app = require("./app.js");
const dotenv = require("dotenv");
const port = process.env.PORT;
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const db = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => console.error("Connection to the database failed💥💥"));

app.listen(port, () => {
  console.log("Server is running on port ");
});
