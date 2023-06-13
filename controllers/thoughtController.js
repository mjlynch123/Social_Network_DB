const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      // Retrieve all thoughts from the database and populate the 'reactions' field
      const thought = await Thought.find().populate({
        path: "reactions",
        select: "-__v",
      });

      // Return the list of thoughts as a response
      res.json(thought);
    } catch (err) {
      // If an error occurs during the process, log the error and return a 500 response with the error message
      console.log({ message: err });
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      // Extract the thoughtId from the request parameters
      const thoughtId = req.params.id;

      // Find a single thought with the given thoughtId
      const thoughts = await Thought.findById(thoughtId);

      // Return the single thought as a response
      res.json(thoughts);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.log(error);
      res.status(500).json({ message: "User does not exist" });
    }
  },

  async postThought(req, res) {
    try {
      // Extract the userId and thoughtText from the request body
      const userId = req.body.userID;
      const thoughtText = req.body.thoughtText;

      // Find the user with the given userId
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        // If the user does not exist, throw an error
        throw new Error("User not found");
      }

      // Create a new Thought instance with the thoughtText and the username from the user
      const thought = new Thought({
        thoughtText,
        username: user.username,
      });

      // Add the new thought to the thoughts array of the user
      user.thoughts.push(thought);

      // Save the new thought and the updated user to the database
      await thought.save();
      await user.save();

      // Return the newly created thought as a response
      res.json(thought);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Error posting thought" });
    }
  },

  async deleteThought(req, res) {
    try {
      // Extract the thoughtId from the request parameters
      const thoughtId = req.params.id;
      console.log(thoughtId);

      // Find and delete the thought with the given thoughtId
      const thought = await Thought.findByIdAndDelete(thoughtId);

      // Check if the thought exists
      if (!thought) {
        // If the thought does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "Thought not found" });
      }

      // Return a 200 response with a success message
      return res.status(200).json({ message: "Thought deleted successfully" });
    } catch (err) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.log(err);
      return res.status(500).json({ message: "Error deleting thought" });
    }
  },

  async updateThought(req, res) {
    try {
      // Extract the thoughtId and thoughtText from the request parameters and body
      const thoughtId = req.params.id;
      const { thoughtText } = req.body;

      // Find and update the thought with the given thoughtId
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );

      // Check if the thought exists
      if (!thought) {
        // If the thought does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "Thought not found" });
      }

      // Return the updated thought as a response
      res.json(thought);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.log(error);
      res.status(500).json({ message: "Failed to update" });
    }
  },
};
