const Deck = require("../models/deck");

module.exports = {
    create,
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
