const gameService = require('../services/gameService');

const createGame = async (req, res) => {
    try {
        const game = await gameService.createGame({ ...req.body, creator: req.user._id });
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAllGames();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await gameService.getGameById(req.params.id);
        res.json(game);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateGame = async (req, res) => {
    try {
        const game = await gameService.updateGame(req.params.id, req.body);
        res.json(game);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteGame = async (req, res) => {
    try {
        await gameService.deleteGame(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { createGame, getAllGames, getGameById, updateGame, deleteGame };