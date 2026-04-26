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

        socket.on('room:join', async (data) => {
            try {
                const { roomId, userId } = data;
                socket.join(roomId);
                const room = await roomService.joinRoom(roomId, userId);
                io.to(roomId).emit('room:joined', { message: `Un joueur a rejoint la salle`, room });
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('room:start', async (data) => {
            try {
                const { roomId } = data;
                const room = await roomService.updateRoom(roomId, { status: 'in_progress' });
                io.to(roomId).emit('room:started', { message: 'La partie a commencé', room });
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('chat:message', (data) => {
            const { roomId, username, message } = data;
            io.to(roomId).emit('chat:message', {
                username,
                message,
                timestamp: new Date().toISOString()
            });
        });

        socket.on('disconnect', () => {
            console.log(`Joueur déconnecté : ${socket.id}`);
        });
    });

    return io;
};

module.exports = initSocket;