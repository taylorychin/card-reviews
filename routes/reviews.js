const express = require('express');
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const isLoggedIn = require(('../config/auth'));

router.post('/decks/:id/reviews', isLoggedIn, reviewsController.create);
router.delete('/reviews/:id', isLoggedIn, reviewsController.delete);

module.exports = router;