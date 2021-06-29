const Deck = require('../models/deck');

module.exports = {
    index,
    new: newDeck,
    create,
    show,
    delete: deleteDeck,
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

async function deleteDeck(req, res) {
    const deck = await Deck.findOne({ 'decks._id': req.params.id });
    const deck = deck.id(req.params.id);
    if (!deck.user.equals(req.user._id)) return res.redirect(`/movies/${deck._id}`);
    deck.remove();
    await deck.save();
    res.redirect(`/decks`);
}

// function deleteDeck(req, res) {
//     Deck.findOneAndDelete(
//         {_id: req.params.id, user}
//     )
// }