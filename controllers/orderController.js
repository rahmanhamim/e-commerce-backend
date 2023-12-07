const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "fake-client-secret-1234";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No items in cart");
  }

  if (
    tax === (null || undefined) ||
    shippingFee === (null || undefined) ||
    typeof tax !== "number" ||
    typeof shippingFee !== "number"
  ) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }

    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add item to order
    orderItems = [...orderItems, singleOrderItem];

    // add subtotal
    subtotal += item.amount * price;
  }

  // calculate total
  const total = subtotal + tax + shippingFee;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total * 100,
    currency: "usd",
  });

  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Order created",
    order,
    clientSecret: order.clientSecret,
  });
};

const getAllOrders = async (req, res) => {
  res.send("get all orders");
};

const getSingleOrder = async (req, res) => {
  res.send("get single order");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("get current user orders");
};

const updateOrder = async (req, res) => {
  res.send("update order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
