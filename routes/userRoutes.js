const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/show-me").get(showCurrentUser);
router.route("/update-user").patch(updateUser);
router.route("/update-user-password").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
