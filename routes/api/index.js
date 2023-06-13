const router = require("express").Router();
const reactionRoutes = require("./reactionRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// Using the routes from the other files
router.use("/reactions", reactionRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
