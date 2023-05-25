const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().populate({
        path: "reactions",
        select: "-__v",
      });
      res.json(thought);
    } catch (err) {
      console.log({ message: err });
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const userId = req.body.userID;
      const thoughtText = req.body.thoughtText;

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const thought = new Thought({
        thoughtText,
        username: user.username,
      });

      user.thoughts.push(thought);
      await thought.save();
      await user.save();

      res.json(thought);
    } catch {
      console.error(error);
      res.status(500).json({ message: "Error posting thought" });
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtId = req.body.thoughtId;
      console.log(thoughtId);

      const thought = await Thought.findByIdAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      return res.status(200).json({ message: "Thought deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error deleting thought' });
    }
  },
};
