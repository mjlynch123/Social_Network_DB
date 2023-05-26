const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/")
.get(getUsers)
.post(createUser);

router.route("/:id")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route("/:id/friends")
.post(addFriend)
.delete(removeFriend);

module.exports = router;
