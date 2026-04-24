const roomService = require('../services/roomService');

const initSocket = (server) => {
    const { Server } = require('socket.io');

    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Joueur connecté : ${socket.id}`);

        // Événement 1 : rejoindre une salle
        socket.on('room:join', async (data) => {
            try {
                const { roomId, userId } = data;

                // Rejoindre le canal Socket de la salle
                socket.join(roomId);

                // Mettre à jour la base de données
                const room = await roomService.joinRoom(roomId, userId);

                // Diffuser à tous les joueurs de la salle
                io.to(roomId).emit('room:joined', {
                    message: `Un joueur a rejoint la salle`,
                    room
                });
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

            // Événement 2 : démarrer la partie
        socket.on('room:start', async (data) => {
            try {
                const { roomId } = data;

                // Mettre à jour le statut de la salle
                const room = await roomService.updateRoom(roomId, { status: 'in_progress' });

                // Diffuser à tous les joueurs de la salle
                io.to(roomId).emit('room:started', {
                    message: 'La partie a commencé',
                    room
                });
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        // Déconnexion
        socket.on('disconnect', () => {
            console.log(`Joueur déconnecté : ${socket.id}`);
        });
    });

    return io;
};

module.exports = initSocket;