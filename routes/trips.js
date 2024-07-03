require("../models/connection");
const Trip = require("../models/trips");

var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.post("/", (req, res) => {
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: {
      $gte: new Date(req.body.date),
      $lt: new Date(
        new Date(req.body.date).setDate(
          new Date(req.body.date).getDate() + 1,
          0,
          0,
          0
        )
      ),
    },
  }).then((data) => {
    if (data) {
      res.json({ result: true, allTrips: data });
    } else {
      res.json({ result: false, error: "No trip found" });
    }
  });
});

module.exports = router;
