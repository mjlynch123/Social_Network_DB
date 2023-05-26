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

  async getSingleUser(req, res) {
    try {
      const userId = req.params.id;
      const users = await User.findById(userId)
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
      res.status(500).json({ message: 'User does not exist' });
    }
  },

  async createUser(req, res) {
    try {
      const { username, email, age } = req.body;
  
      // Create a new user instance
      const user = new User({
        username,
        email,
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { username, email } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
  
      // Find the user and populate the thoughts field
      const user = await User.findById(userId).populate('thoughts');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete the user's thoughts
      for (const thought of user.thoughts) {
        await Thought.findByIdAndDelete(thought._id);
      }
  
      // Delete the user
      await User.deleteOne({_id: userId});
  
      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
};