const CustomErr = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return next(new CustomErr.UnauthenticatedError("Authentication invalid"));
  }

  try {
    const payload = isTokenValid({ token });
    req.user = payload;
    next();
  } catch (error) {
    return next(new CustomErr.UnauthenticatedError("Authentication required"));
  }
};

const authorizePermissions = (...roles) => {
  // rest operator ...roles is an array of roles because of the rest operator
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomErr.UnauthorizedError(
        "You do not have permission to perform this action"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
