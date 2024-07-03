require("../models/connection");
const moment = require("moment");
const Cart = require("../models/carts");

var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

// route post pour créer un Cart avec un trip (POST /cart,req.body:departure,arrival,date,price/res:cart_id)
router.post("/", (req, res) => {
  if (
    req.body.departure === null ||
    req.body.departure === "" ||
    req.body.arrival === null ||
    req.body.arrival === "" ||
    req.body.date === null ||
    req.body.date === "" ||
    req.body.price === null ||
    req.body.price === ""
  ) {
    res.json({ result: false, error: "Cannot book trip" });
    return;
  }
  const newCart = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
  });
  newCart.save().then((data) => {
    res.json({ result: true, cartId: data._id });
  });
});

// route get pour retourner tous les trips d'un panier (GET /cart/:cartid, req.params:cartid/res:{cartTrips})
router.get("/:cardid", (req, res) => {
  if (req.params.cardid === null || req.params.cardid === "") {
    res.json({ result: false, error: "Missing cartid" });
    return;
  }
  Cart.find();
});

// route put pour updater un cart en rajoutant un trip (PUT

// route delete pour supprimer un trip de la card (DELETE /cart/:cartid, req.body:departure,arrival,date,price/res: true/false)

// la suppression d'une cart en entier se fera sur la route POST /bookings

module.exports = router;
