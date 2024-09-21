// Importing required modules
const express = require("express");
const router = express.Router();

// Importing controller functions from homeCtrl
const {
  home,
  forgotPasswordPage,
  login,
  otpverification,
  resetPassword,
  adminPage,
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
} = require("../controller/homeCtrl");

// Public Routes
router.get("/home", home);
router.get("/category", category);
router.get("/detail", detail);
router.get("/shopping-cart", shoppingCart);
router.get("/checkout", checkout);
router.get("/blog", blog);
router.get("/blog-details", blogDetails);
router.get("/contact", contact);
router.get("/my-wishlist", myWishlist);
router.get("/terms-conditions", termsConditions);
router.get("/track-orders", trakOrders);
router.get("/faq", faq);
router.get("/404", error);
router.get("/my-account", myAccount);

// Admin Routes
router.get("/adminPage", adminPage);

// Authentication Routes
router.get("/forgot-password-page", forgotPasswordPage);
router.get("/login", login);
router.get("/otpverification", otpverification);
router.get("/reset-password", resetPassword);

// Exporting the router to be used in other parts of the application
module.exports = router;
