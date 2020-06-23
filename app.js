const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");

app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/stock", stockRoutes);

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection successful"));

app.listen(process.env.PORT || 8000, () => {
  console.log("server running", process.env.PORT);
});
