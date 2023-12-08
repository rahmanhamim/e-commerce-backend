const CustomError = require("../errors");

// resource user id is the id of the user who owns the resource. this is from the database
const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof requestUser.userId);
  // console.log(typeof resourceUserId);

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError("Unauthorized to access this route");
};

module.exports = checkPermissions;
