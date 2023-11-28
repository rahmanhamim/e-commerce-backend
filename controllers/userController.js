const getAllUsers = async (req, res) => {
  res.send("all users");
};

const getSingleUser = async (req, res) => {
  res.status(200).json({ userId: req.params.id });
};

const showCurrentUser = async (req, res) => {
  res.send("current user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
