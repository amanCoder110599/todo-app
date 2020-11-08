const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressip = require("express-ip");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(expressip().getIpInfoMiddleware);

const uri =
  "mongodb+srv://schools:GC00eB1WtiM34a6D@schools.l9qgr.mongodb.net/<dbname7>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const todosRouter = require("./routes/todos");

app.use("/todos", todosRouter);
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
