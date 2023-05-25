const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: 'thoughts',
          populate: {
            path: 'reactions',
            select: '-__v',
          },
        })
        .populate('friends');

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  },
};