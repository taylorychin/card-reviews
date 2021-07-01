const express = require('express');
const router = express.Router();
const decksController = require('../controllers/decks');
const isLoggedIn = require('../config/auth');

router.get('/', decksController.index);
router.get('/new', isLoggedIn, decksController.new);
router.get('/:id/edit', decksController.edit)
router.get("/:id", decksController.show);

router.post('/', isLoggedIn, decksController.create);

//router.put("/:id", isLoggedIn, decksController.update); 

router.delete("/:id", isLoggedIn, decksController.delete);


router.put('/:id', decksController.update);

module.exports = router;