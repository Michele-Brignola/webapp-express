const express = require("express");
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test-error", (req, res) => {
  a.b;
  res.send("hello world");
});

// Error Handling
const errorMiddleware = require("./middlewares/errorHandlers");
app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);

// Server Start
app.listen(process.env.APP_PORT, () => {
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server Listening on: " + process.env.APP_URL + ":" + process.env.APP_PORT,
  );
});
