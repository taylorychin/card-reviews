const Deck = require('../models/deck');

module.exports = {
    index,
    new: newDeck,
    create,
    show,
    delete: deleteDeck,
    update,
    edit,
}

function index(req, res) {
    Deck.find({}, function (err, decks) {
        res.render("decks/index", { title: "All Decks", decks })
    });
}

function newDeck(req, res) {
    res.render('decks/new', { title: "Add Deck" });
}

function create(req, res) {
    req.body.user = req.user._id;
    const deck = new Deck(req.body);
    deck.save(function (err) {
        console.log("deck created");
        if (err) return res.redirect('/decks/new');
        res.redirect(`/decks/${deck._id}`);
    });
}

function show(req, res) {
    Deck.findById(req.params.id, function (err, deck) {
        if (err) console.log(err);
        res.render('decks/show', { title: "Deck Details", deck });
    });
}


function deleteDeck(req, res) {
    Deck.findOneAndDelete(
        { _id: req.params.id, user: req.user._id },
        function (err) {
            res.redirect('/decks');
        }
    );
}

function update(req, res) {
    Deck.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true },
        function (err, deck) {
            if (err || !deck) return res.redirect('/decks');
            res.redirect(`/decks/${deck._id}`);
        }
    );
}

function edit(req, res) {
    Deck.findOne({ _id: req.params.id, user: req.user._id }, function (err, deck) {
        if (err || !deck) return res.redirect('/decks');
        res.render(`decks/edit`, { title: "edit deck", deck })
    });
}