const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

module.exports = {
  async getReactions(req, res) {
    // Retrieve all reactions from the database
    const reaction = await Reaction.find();

    // Return the list of reactions as a response
    res.json(reaction);
  },

  async getSingleReaction(req, res) {
    // Extract the reactionId from the request parameters
    const reactionId = req.params.id;

    // Find a single reaction with the given reactionId
    const reaction = await Reaction.findById(reactionId);

    // Return the single reaction as a response
    res.json(reaction);
  },

  async postReaction(req, res) {
    try {
      // Extract the thoughtId from the request parameters
      const thoughtId = req.params.id;
      // Extract the reactionBody from the request body
      const { reactionBody } = req.body;

      // Find the thought with the given thoughtId
      const thought = await Thought.findById(thoughtId);
      console.log(thought);

      // Check if the thought exists
      if (!thought) {
        // If the thought does not exist, return a 404 response with an error message
        return res.status(404).json({ message: "Thought not found" });
      }

      // Create a new Reaction instance with the reactionBody
      const reaction = new Reaction({
        reactionBody,
      });

      // Add the new reaction to the reactions array of the thought
      thought.reactions.push(reaction);

      // Save the new reaction and the updated thought to the database
      await reaction.save();
      await thought.save();

      // Return the newly created reaction as a response
      res.json(reaction);
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: "Error posting reaction" });
    }
  },

  async deleteReaction(req, res) {
    try {
      const reactionId = req.params.id;

      // Find the thought that contains the reaction
      const thought = await Thought.findOne({ reactions: reactionId });

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      // Remove the reaction from the thought's reactions array
      thought.reactions.pull(reactionId);

      // Save the updated thought
      await thought.save();

      // Delete the reaction from the Reaction collection
      await Reaction.findByIdAndDelete(reactionId);

      res.json({ message: "Reaction deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting reaction" });
    }
  },
};
