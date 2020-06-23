const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Provide your type"],
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, "Provide your stock"],
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
