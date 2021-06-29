const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Deck", deckSchema);