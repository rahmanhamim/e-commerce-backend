const mongoose = require("mongoose");

// const connectDB = (url) => {
//   return mongoose.connect(url);
// };

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
