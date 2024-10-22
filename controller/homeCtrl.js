const productModel = require("../models/ProductModeles");
const categoryModel = require("../models/CategoryModels");

const home = async (req, res) => {
  const { userId, isLoggedIn } = req.session;
  const categories = await categoryModel.find();
  const products = await productModel.find();

  res.render("home/home", {
    title: "home",
    isLoggedIn: req.session?.isLoggedIn,
    products,
    categories,
  });
};
const logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/home");
};
const forgotPasswordPage = (req, res) => {
  res.render("userSide/forgot-password-page");
};
const login = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("userSide/sign-in", {
    title: "login",
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const otpverification = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("userSide/otpVerification", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const resetPassword = (req, res) => {
  res.render("userSide/reset-password", {
    isLoggedIn: req.session?.isLoggedIn,
  });
};

const category = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/category", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const detail = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  res.render("home/detail", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const shoppingCart = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/shopping-cart", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const checkout = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/checkout", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const blog = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/blog", { isLoggedIn: req.session?.isLoggedIn, categories });
};
const blogDetails = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/blog-details", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const contact = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/contact", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const myWishlist = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/my-wishlist", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const termsConditions = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/terms-conditions", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const trakOrders = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/track-orders", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};
const faq = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/faq", { isLoggedIn: req.session?.isLoggedIn, categories });
};
const error = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/404", { isLoggedIn: req.session?.isLoggedIn, categories });
};
const myAccount = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();

  res.render("home/myAccount", {
    isLoggedIn: req.session?.isLoggedIn,
    categories,
  });
};

module.exports = {
  home,
  forgotPasswordPage,
  login,
  otpverification,
  resetPassword,
  category,
  detail,
  shoppingCart,
  checkout,
  blog,
  blogDetails,
  contact,
  myWishlist,
  termsConditions,
  trakOrders,
  faq,
  error,
  myAccount,
  logOut,
};
