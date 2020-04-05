const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorksSchema = new Schema({
    img: {
        data: Buffer,
        type: String,
        required: "you must include an image file"
    },
    title: {
        type: String,
        required: "you must give your image a title"
    },
    description: {
        type: String
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    },
    tags: [
        {
            type: String,
            validate: [/^\w+$/, 'tags can only include numbers, letters, and underscores']
        }
    ]
})


const Works = mongoose.model("Works", WorksSchema)

module.exports = Works;