const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a product name"],
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [2, "Name must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please add a company"],
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message:
          "{VALUE} is not supported please select from [ikea, liddy, caressa, marcos]",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: [true, "Please add a color"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please  add a inventory"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: { $gte: 3 } },
});

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    // console.log("productId", this); // not this._conditions._id
    const productId = this._id;
    await mongoose.model("Review").deleteMany({ product: productId });
    next();
  }
);

module.exports = mongoose.model("Product", ProductSchema);
