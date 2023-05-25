const {
  postThought,
  getThoughts,
  deleteThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/").get(getThoughts).post(postThought).delete(deleteThought);

module.exports = router;
