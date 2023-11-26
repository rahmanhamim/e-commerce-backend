const register = async (req, res) => {
  res.send("register route");
};

const login = async (req, res) => {
  res.send("login route");
};

const logout = async (req, res) => {
  res.send("logout route");
};

module.exports = {
  register,
  login,
  logout,
};
