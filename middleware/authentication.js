const CustomErr = require("../errors");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");
const Token = require("../models/Token");

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomErr.UnauthenticatedError("Invalid token");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
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
