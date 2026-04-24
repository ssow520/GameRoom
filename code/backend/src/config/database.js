const mongoose = require('mongoose');

class Database {
    static instance = null;

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect() {
        try {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gameroom';
            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }
    }
}

module.exports = Database;