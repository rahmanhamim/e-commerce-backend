const createTokenUser = (user) => {
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
  };
  return tokenUser;
};

module.exports = createTokenUser;
