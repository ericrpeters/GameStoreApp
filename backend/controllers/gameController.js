const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find({ sold: false }).populate('seller', 'username');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games" });
  }
};
