const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, gameController.createGame);
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.put('/:id', authMiddleware, gameController.updateGame);
router.delete('/:id', authMiddleware, gameController.deleteGame);

module.exports = router;