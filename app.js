const express = require("express");
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Rotte
const globalRouter = require("./backend-library/routers/globalRouter");
const movieRouter = require("./backend-library/routers/movieRouter");
app.use(globalRouter)
app.use("/movie", movieRouter)

// Error Handling
const errorMiddleware = require("./backend-library/middlewares/errorHandlers");
app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);

// Server Start
app.listen(process.env.APP_PORT, () => {
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server Listening on: " + process.env.APP_URL + ":" + process.env.APP_PORT,
  );
});