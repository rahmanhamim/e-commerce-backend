const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please add a rating between 1 and 5"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title for the review"],
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
      maxlength: [1000, "Comment can not be more than 1000 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// user can only add one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
