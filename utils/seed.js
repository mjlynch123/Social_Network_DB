const mongoose = require("mongoose");
const data = require("./data");

// Import the User and Thought models
const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/socialMedia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed the data
const seedDatabase = async () => {
  try {
    // Clear existing data from the collections
    await User.deleteMany();
    await Thought.deleteMany();
    // if (Reaction) {
    //   await Reaction.deleteMany();
    // }

    // Seed the users
    const seededUsers = await User.create(data.users);

    // Assign user references to thoughts
    const thoughtsWithUserReferences = data.thoughts.map((thought, index) => ({
      ...thought,
      username: seededUsers[index % seededUsers.length].username,
    }));

    // Seed the thoughts
    const seededThoughts = await Thought.create(thoughtsWithUserReferences);

    // Assign thought references to reactions if Reaction model exists
    // if (Reaction) {
    //   const reactionsWithThoughtReferences = data.reactions.map(
    //     (reaction, index) => ({
    //       ...reaction,
    //       thought: seededThoughts[index % seededThoughts.length]._id,
    //     })
    //   );

    //   // Seed the reactions
    //   await Reaction.create(reactionsWithThoughtReferences);
    // }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Call the seedDatabase function
seedDatabase();
