const express = require("express");
const connection = require("./database/conn");
const router = express.Router();

router.get("/", (req, res) => {
  const moviesSQL = "SELECT * FROM movies.movies;";
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailedQuery(err, res);
    console.log(result);
  });
});

module.exports = router;

function handleFailedQuery(err, res) {
  const responseData = {
    message: "Database query failed",
  };

  if (process.env.APP_MODE === "DEV") {
    responseData.error = err.message;
  }

  console.log(err.message);
  return res.status(500).json(responseData);
}
