const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    async register(userData) {
        const { username, email, password, avatar } = userData;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('Email ou nom d\'utilisateur déjà utilisé');
        }

        const user = new User({ username, email, password, avatar });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return { user, token };
    }

    async login(credentials) {
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return { user, token };
    }

    async getMe(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return user;
    }
}

module.exports = new AuthService();