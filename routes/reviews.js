const express = require('express');
const router = express.Router();
const reviewsController = require("../controllers/reviews");

router.post('/decks/:id/reviews', isLoggedIn, reviewsController.create);