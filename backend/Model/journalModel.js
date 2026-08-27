const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    mood: { type: String, required: true },
    prompt: { type: String, default: "" },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    userId: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model('Journal', journalSchema);