const express = require("express");
const connection = require("../database/conn");
const { handleFailedQuery } = require("../utils/database");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Benvenuto!" });
});

module.exports = router;
