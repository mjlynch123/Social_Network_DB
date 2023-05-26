const {
  postThought,
  getThoughts,
  deleteThought,
  getSingleThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/").get(getThoughts).post(postThought);

router.route("/:id").get(getSingleThought).delete(deleteThought);

module.exports = router;
