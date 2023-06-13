const router = require("express").Router();
// Grabbing all of the functions from our userController
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Creating the routes for our API
router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends").post(addFriend).delete(removeFriend);

module.exports = router;
