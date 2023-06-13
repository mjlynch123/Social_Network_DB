const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getUsers(req, res) {
    try {
      // Retrieve all users from the database
      const users = await User.find()
        .populate({
          path: "thoughts",
          select: "_id", // Include only the _id field of thoughts
          // populate: {
          //   path: 'reactions',
          //   select: '-__v',
          // },
        })
        .populate({
          path: "friends",
          select: "_id", // Include only the _id field of friends
        })
        .lean();

      // Modify the users array to include only the _id fields of thoughts and friends
      users.forEach((user) => {
        user.thoughts = user.thoughts.map((thought) => thought._id.toString());
        user.friends = user.friends.map((friend) => friend._id.toString());
        user.friendCount = user.friends.length;
      });

      // Return the modified users array as a JSON response
      res.json(users);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  },

  async getSingleUser(req, res) {
    try {
      // Extract the userId from the request parameters
      const userId = req.params.id;

      // Find a single user with the given userId and populate the thoughts and friends fields
      const users = await User.findById(userId)
        .populate({
          path: "thoughts",
          populate: {
            path: "reactions",
            select: "-__v",
          },
        })
        .populate("friends");

      // Return the single user as a JSON response
      res.json(users);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "User does not exist" });
    }
  },

  async createUser(req, res) {
    try {
      // Extract the username, email, and age from the request body
      const { username, email, age } = req.body;

      // Create a new user instance
      const user = new User({
        username,
        email,
      });

      // Save the user to the database
      await user.save();

      // Return a 201 response with the created user as a JSON response
      res.status(201).json(user);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Failed to create user" });
    }
  },

  async updateUser(req, res) {
    try {
      // Extract the userId, username, and email from the request parameters and body
      const userId = req.params.id;
      const { username, email } = req.body;

      // Find and update the user with the given userId
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );

      // Check if the user exists
      if (!user) {
        // If the user does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "User not found" });
      }

      // Return the updated user as a JSON response
      res.json(user);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Failed to update user" });
    }
  },

  async deleteUser(req, res) {
    try {
      // Extract the userId from the request parameters
      const userId = req.params.id;

      // Find the user and populate the thoughts field
      const user = await User.findById(userId).populate("thoughts");

      // Check if the user exists
      if (!user) {
        // If the user does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user's thoughts
      for (const thought of user.thoughts) {
        await Thought.findByIdAndDelete(thought._id);
      }

      // Delete the user
      await User.deleteOne({ _id: userId });

      // Return a JSON response with a success message
      res.json({
        message: "User and associated thoughts deleted successfully",
      });
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  },

  // ! Friends

  async addFriend(req, res) {
    try {
      // Extract the userId and friendId from the request parameters and body
      const userId = req.params.id;
      const friendId = req.body.friendId;

      // Find the user and the friend by their IDs
      const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId),
      ]);

      // Check if the user or friend does not exist
      if (!user || !friend) {
        // If the user or friend does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "User or friend not found" });
      }

      // Check if the friend already exists in the user's friend list
      if (user.friends.includes(friendId)) {
        // If the friend already exists, return a 400 response with an error message
        return res.status(400).json({ message: "Friend already added" });
      }

      // Add friend to the user's friend list
      user.friends.push(friendId);
      await user.save();

      // Check if the user already exists in the friend's friend list
      if (friend.friends.includes(userId)) {
        // If the user already exists, return a 400 response with an error message
        return res.status(400).json({ message: "Friend already added" });
      }

      // Add user to the friend's friend list
      friend.friends.push(userId);
      await friend.save();

      // Return a JSON response with a success message
      res.json({ message: "Friend added successfully" });
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Failed to add friend" });
    }
  },

  async removeFriend(req, res) {
    try {
      // Extract the userId and friendId from the request parameters and body
      const userId = req.params.id;
      const friendId = req.body.friendId;

      // Find the user and the friend by their IDs
      const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId),
      ]);

      // Check if the user or friend does not exist
      if (!user || !friend) {
        // If the user or friend does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "User or friend not found" });
      }

      // Remove friend from the user's friend list
      user.friends.pull(friendId);
      await user.save();

      // Remove user from the friend's friend list
      friend.friends.pull(userId);
      await friend.save();

      // Return a JSON response with a success message
      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Failed to remove friend" });
    }
  },
};
