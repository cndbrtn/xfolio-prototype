const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        validate: [({ length }) => length <= 70]
    },
    body: {
        type: String,
        required: 'you gotta say something!'
    },
    tags: [
        {
            type: String,
            validate: [/^\w+$/, 'tags can only include numbers, letters, and underscores']
        }
    ]
})

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;