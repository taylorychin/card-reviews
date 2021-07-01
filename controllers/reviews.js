const Deck = require("../models/deck");

module.exports = {
    create,
    delete: deleteReview
}

//delete review


function create(req, res) {
    //finds deck for the review.
    Deck.findById(req.params.id, function (err, deck) {
        req.body.user = req.user.id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        deck.reviews.push(req.body);
        //save top level doc not review.
        deck.save(function (err) {
            res.redirect(`/decks/${deck._id}`);
        });
    });
}

async function deleteReview(req, res) {
    const deck = await Deck.findOne({ 'reviews._id': req.params.id });
    // Want to ensure that the review was
    // created by the currently logged in user
    // before we remove it
    const review = deck.reviews.id(req.params.id);
    if (!review.user.equals(req.user._id)) return res.redirect(`/decks/${deck._id}`);
    review.remove();
    // Save the updated deck
    await deck.save();
    res.redirect(`/decks/${deck._id}`);
}