const Stock = require("../models/stockModel");
const catchAsync = require("../utils/catchAsync");

exports.createStock = catchAsync(async (req, res) => {
  const { type, stock } = req.body;

  if (!type || !stock) {
    res.status(422).json({
      status: "Fail",
      message: "Please provide all fields",
    });
  }

  const checkType = await Stock.findOne({ type });
  if (checkType) {
    res.status(422).json({
      status: "Fail",
      message: "Type already exists",
    });
  }

  const newStock = new Stock({
    type,
    stock,
  });

  const saveStock = await newStock.save();
  res.status(200).json({
    status: "success",
    message: "Stock added successfully",
    data: saveStock,
  });
});

exports.getAllStocks = catchAsync(async (req, res) => {
  const stocks = await Stock.find();
  res.status(200).json({
    status: "success",
    data: stocks,
  });
});

exports.updateStock = catchAsync(async (req, res) => {
  await Stock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        return res.json(422).json({ status: "Fail", message: err });
      }
      res.status(200).json({
        status: "success",
        message: "Stock was successfully updated",
        data: result,
      });
    }
  );
});
