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

// statics are called on the schema itself not on the instance like methods i repeat.
ReviewSchema.statics.calcAverageRatings = async function (productId) {
  console.log("productId from calc avg rating", productId);
};

ReviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.product);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    await this.model("Review").calcAverageRatings(doc.product);
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
