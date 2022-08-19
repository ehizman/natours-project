const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes")

const app = express();

//middleware stack
app.use(express.json());

if (process.env.NODE_ENV === "development"){
  //morgan is used for logging purposes
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`))

//adding custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//mounting the routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter)

module.exports = app;
