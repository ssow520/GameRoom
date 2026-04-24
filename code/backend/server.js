require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const Database = require('./src/config/database');
const initSocket = require('./src/socket/index');
const authRoutes = require('./src/routes/authRoutes');
const gameRoutes = require('./src/routes/gameRoutes');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Connexion à la base de données
Database.getInstance().connect();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/rooms', roomRoutes);

// Port
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});