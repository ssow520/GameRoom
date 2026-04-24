const Room = require('../models/Room');

class RoomService {
    async createRoom(roomData) {
        const room = new Room(roomData);
        await room.save();
        return room;
    }

    async getAllRooms() {
        return await Room.find()
            .populate('game', 'title category maxPlayers')
            .populate('host', 'username avatar')
            .populate('players', 'username avatar');
    }

    async getRoomById(roomId) {
        const room = await Room.findById(roomId)
            .populate('game', 'title category maxPlayers')
            .populate('host', 'username avatar')
            .populate('players', 'username avatar');
        if (!room) {
            throw new Error('Salle non trouvée');
        }
        return room;
    }

    async updateRoom(roomId, roomData) {
        const room = await Room.findByIdAndUpdate(roomId, roomData, { new: true })
            .populate('game', 'title category maxPlayers')
            .populate('host', 'username avatar')
            .populate('players', 'username avatar');
        if (!room) {
            throw new Error('Salle non trouvée');
        }
        return room;
    }

    async deleteRoom(roomId) {
        const room = await Room.findByIdAndDelete(roomId);
        if (!room) {
            throw new Error('Salle non trouvée');
        }
        return room;
    }

    async joinRoom(roomId, userId) {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Salle non trouvée');
        }
        if (room.players.includes(userId)) {
            throw new Error('Vous êtes déjà dans cette salle');
        }
        if (room.players.length >= room.maxPlayers) {
            throw new Error('La salle est pleine');
        }
        room.players.push(userId);
        await room.save();
        return room;
    }
}

module.exports = new RoomService();