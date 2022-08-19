const express = require("express");
const {checkBody,checkID,getAllTours, postATour, getATourById, updateATour, deleteATour}= require(`${__dirname}/../controllers/tourController`)
const tourRouter = express.Router();


//param middleware
tourRouter.param("id", checkID)

tourRouter.route("/")
    .get(getAllTours)
    .post(checkBody,postATour);
tourRouter.route("/:id")
    .get(getATourById)
    .patch(updateATour)
    .delete(deleteATour);

module.exports = tourRouter;