const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});
//    picture, name, company, producer description 
const deckSchema = new Schema({
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    producer: {
        type: String,
    },
    desc: {
        type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [reviewSchema]
})

module.exports = mongoose.model("Deck", deckSchema);