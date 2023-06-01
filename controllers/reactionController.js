const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction")

module.exports = {
  async getReactions(req, res) {
    const reaction = await Reaction.find();

    res.json(reaction);
  },

  async getSingleReaction(req, res) {
    const reactionId = req.params.id;
    const reaction = await Reaction.findById(reactionId);
    res.json(reaction);
  },

  async postReaction(req, res) {
    try {
      const thoughtId = req.params.id;
      const { reactionBody } = req.body;

      const thought = await Thought.findById(thoughtId);
      console.log(thought);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      const reaction = new Reaction({
        reactionBody,
      });

      thought.reactions.push(reaction);
      await reaction.save();
      await thought.save();

      res.json(reaction);
    } catch (error) {
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
          return res.status(404).json({ message: 'Thought not found' });
        }
    
        // Remove the reaction from the thought's reactions array
        thought.reactions.pull(reactionId);
    
        // Save the updated thought
        await thought.save();
    
        // Delete the reaction from the Reaction collection
        await Reaction.findByIdAndDelete(reactionId);
    
        res.json({ message: 'Reaction deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting reaction' });
      }
  }
};
