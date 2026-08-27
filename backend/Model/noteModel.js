const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    images:{
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;