// Grabbing all the functions from our reactionController
const {
  getReactions,
  postReaction,
  getSingleReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

const router = require("express").Router();

router.route("/").get(getReactions);

router
  .route("/:id")
  .get(getSingleReaction)
  .post(postReaction)
  .delete(deleteReaction);

module.exports = router;
