const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(
      `No product with id : ${req.params.id}`
    );
  }

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadyReviewed) {
    throw new CustomError.BadRequestError(
      "You have already reviewed this item"
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const review = await Review.find({});
  res.status(StatusCodes.OK).json({ count: review.length, review });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.send("update review");
};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${req.params.id}`);
  }

  checkPermissions(req.user, review.user);

  await review.deleteOne({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ msg: "success! review removed" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
