// Grabbing the methods from the thoughtController
const {
  postThought,
  getThoughts,
  deleteThought,
  getSingleThought,
  updateThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/").get(getThoughts).post(postThought);

router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
