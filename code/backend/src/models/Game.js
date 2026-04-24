const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['action', 'stratégie', 'puzzle', 'sport', 'rpg', 'autre'], default: 'autre' },
    maximumPlayers: { type: Number, min: 2, max: 16 },
    minimumPlayers: { type: Number, default: 2 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;