const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decks');
const isLoggedIn = require('../config/auth');

router.get('/', decksController.index);
router.get('/new', isLoggedIn, decksController.new);
router.post('/', isLoggedIn, decksController.create);
router.get("/:id", decksController.show);

module.exports = router;