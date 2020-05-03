const express = require("express");
const router = express.Router();
const { NOT_FOUND } = require("../../config");

router.use("/status", require("./status"));

module.exports = router;
