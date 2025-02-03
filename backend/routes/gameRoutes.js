const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Insert a new game into the database
router.post('/add', async (req, res) => {
    try {
        const { title, description, price, image, seller } = req.body;
        const newGame = new Game({ title, description, price, image, seller, sold: false });
        await newGame.save();
        res.status(201).json({ message: "Game added successfully!", game: newGame });
    } catch (error) {
        res.status(500).json({ message: "Error adding game", error });
    }
});

// Get games from database
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({ sold: false }); // Get only unsold games
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games", error });
    }
});

router.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const userGames = await Game.find({ seller: username }); // Find all games associated with the user
        res.status(200).json({ games: userGames });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's games", error });
    }
});

// Remove game from database
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting game", error });
    }
});

// Update game property 
router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Get the game ID from the URL parameters
    const { sold } = req.body;  // Get the sold value from the request body

    try {
        const game = await Game.findByIdAndUpdate(id, { sold }, { new: true });

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.json(game);  // Return the updated game
    } catch (error) {
        console.error('Error updating game sold status:', error);
        res.status(500).json({ message: 'Error updating game sold status' });
    }
});

module.exports = router;
