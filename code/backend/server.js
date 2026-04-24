require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const Database = require('./src/config/database');

const app = express();
const server = http.createServer(app);

// Connexion à la base de données
Database.getInstance().connect();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});