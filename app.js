const mongoose = require("mongoose");

const express = require("express");
const app = express();

const morgan = require("morgan");

const todosRouter = require("./routers/todos");

mongoose
  .connect("mongodb://localhost/tdl_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((error) => console.log("MongoDB connection failed", error));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
