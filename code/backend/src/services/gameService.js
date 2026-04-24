const Game = require('../models/Game');

class GameService {
    async createGame(gameData) {
        const game = new Game(gameData);
        await game.save();
        return game;
    }

    async getAllGames() {
        return await Game.find().populate('creator', 'username avatar');
    }

    async getGameById(gameId) {
        const game = await Game.findById(gameId).populate('creator', 'username avatar');
        if (!game) {
            throw new Error('Jeu non trouvé');
        }
        return game;
    }

    async updateGame(gameId, gameData) {
        const game = await Game.findByIdAndUpdate(gameId, gameData, { new: true });
        if (!game) {
            throw new Error('Jeu non trouvé');
        }
        return game;
    }

    async deleteGame(gameId) {
        const game = await Game.findByIdAndDelete(gameId);
        if (!game) {
            throw new Error('Jeu non trouvé');
        }
        return game;
    }
}

module.exports = new GameService();