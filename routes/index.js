const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Sending a message for an incorrect route
router.use((req, res) => {
  return res.send("Wrong Route!");
});

module.exports = router;
