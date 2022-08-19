const fs = require("fs");
const {json} = require("express");

let tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);
exports.checkBody = (req, res, next) => {
    const reqBody = req.body;
    if (!(reqBody.price && reqBody.name)){
        return res.status(400).json({
            "status" : 400,
            "message" : "invalid request. Request must contain price and name property",
        });
    }
    next();
}
exports.checkID = (req, res, next, val) => {
    if (val >= tours.length){
        return res.status(400).json({
                "status" : 400,
                "message" : "invalid id",
            }
        );
    }
    next();
}


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getATourById = (req, res) => {
    const id = parseInt(req.params.id);
    //const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: "failed",
            message: "No tour found with the specified id",
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

exports.postATour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    console.log(tours);
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (!err) {
                res.status(201).json({
                    status: "success",
                    data: {
                        tours,
                    },
                });
                console.log("Added new tour");
            } else {
                console.log(err);
            }
        }
    );
};

exports.updateATour = (req, res) => {
    console.log("Here");
    const id = parseInt(req.params.id);
    const tour = tours.find((el) => el.id === id);
    if (tour === undefined) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: "object with specified id is not found",
            },
        });
    }
    console.log("Before update", tour);

    Object.keys(req.body).forEach((key) => {
        tour[`${key}`] = req.body[key];
    });
    console.log("After update", tour);
    tours[tour.id] = tour;
    fs.writeFile(
        `${__dirname}/dev-data/data/tours_simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (!err) {
                return res.status(200).json({
                    status: "success",
                    data: {
                        tour: tours[id],
                    },
                });
            } else {
                return res.status(400).json({
                    status: "fail",
                    data: {
                        message: `error: ${err.message}`,
                    },
                });
            }
        }
    );
};

exports.deleteATour = (req, res) => {
    console.log("Tours before deleting => ", tours);
    const id = req.params.id;
    tours = tours.filter(function (tour, index, tours) {
        return tour.id !== id;
    });
    console.log("Tours ==> ", tours);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours_simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (!err) {
                return res.status(200).json({
                    status: "success",
                    data: {
                        tours,
                    },
                });
            } else {
                return res.status(400).json({
                    status: "fail",
                    data: {
                        message: `error: ${err.message}`,
                    },
                });
            }
        }
    );
};