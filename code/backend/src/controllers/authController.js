const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { register, login, getMe };