const roomService = require('../services/roomService');

const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom({ ...req.body, host: req.user._id });
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        res.json(room);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        res.json(room);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const joinRoom = async (req, res) => {
    try {
        const room = await roomService.joinRoom(req.params.id, req.user._id);
        res.json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, joinRoom };