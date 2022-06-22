module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");

  const Data = mongoose.model("Data");

  app.use("/data", router);

  //
  // router.post("/getdata", async (req, res) => {});
};
