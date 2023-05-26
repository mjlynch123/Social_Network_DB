const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate({
        path: 'thoughts',
        select: '_id', // Include only the _id field of thoughts
        // populate: {
        //   path: 'reactions',
        //   select: '-__v',
        // },
      })
      .populate({
        path: 'friends',
        select: '_id', // Include only the _id field of friends
      })
      .lean();

      users.forEach(user => {
        user.thoughts = user.thoughts.map(thought => thought._id.toString());
        user.friends = user.friends.map(friend => friend._id.toString());
        user.friendCount = user.friends.length;
      });

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
  },

  // ! Friends

  async addFriend(req, res) {
    try {
      const userId = req.params.id;
      const friendId = req.body.friendId;
  
      // Find the user and the friend by their IDs
      const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId)
      ]);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      // Check if the friend already exists in the user's friend list
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }
  
      // Add friend to the user's friend list
      user.friends.push(friendId);
      await user.save();
  
      // Check if the user already exists in the friend's friend list
      if (friend.friends.includes(userId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }
  
      // Add user to the friend's friend list
      friend.friends.push(userId);
      await friend.save();
  
      res.json({ message: 'Friend added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add friend' });
    }
  },

  async removeFriend(req, res) {
    try {
      const userId = req.params.id;
      const friendId = req.body.friendId;
  
      // Find the user and the friend by their IDs
      const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId)
      ]);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      // Remove friend from the user's friend list
      user.friends.pull(friendId);
      await user.save();
  
      // Remove user from the friend's friend list
      friend.friends.pull(userId);
      await friend.save();
  
      res.json({ message: 'Friend removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove friend' });
    }
  }
};