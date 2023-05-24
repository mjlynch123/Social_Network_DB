const users = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
  },
  {
    username: "mike_johnson",
    email: "mike.johnson@example.com",
  },
  {
    username: "sarah_walker",
    email: "sarah.walker@example.com",
  },
  {
    username: "david_miller",
    email: "david.miller@example.com",
  },
  {
    username: "emily_thompson",
    email: "emily.thompson@example.com",
  },
];

const thoughts = [
  {
    thoughtText: "This is my first thought.",
    createdAt: new Date(),
    username: "john_doe",
  },
  {
    thoughtText: "What a beautiful day!",
    createdAt: new Date(),
    username: "jane_smith",
  },
  {
    thoughtText: "I'm excited for the weekend!",
    createdAt: new Date(),
    username: "mike_johnson",
  },
];

const reactions = [
  {
    reactionBody: "I agree!",
    username: "john_doe",
    createdAt: new Date(),
  },
  {
    reactionBody: "That's interesting.",
    username: "jane_smith",
    createdAt: new Date(),
  },
  {
    reactionBody: "Great post!",
    username: "mike_johnson",
    createdAt: new Date(),
  },
];

module.exports = { users, thoughts, reactions };
