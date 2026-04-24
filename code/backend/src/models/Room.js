const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['waiting', 'in_progress', 'finished'], default: 'waiting' },
    maxPlayers: { type: Number, min: 2, max: 16 },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;