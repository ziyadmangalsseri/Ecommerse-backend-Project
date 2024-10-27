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
  searchProduct,
} = require("../controller/homeCtrl");

// Public Routes
router.get("/home", home);
router.get("/category", category);
router.get("/detail/:id", detail);
router.get("/detailOG", async (req, res) => {
  // const productId = req.params.id;
  try {
    // const product = await Product.findById(productId); // Replace with your database fetching logic
    const { isLoggedIn, email, userId } = req.session;
    const categories = await categoryModel.find();

    res.render("home/detail", { isLoggedIn: req.session?.isLoggedIn,categories });
  } catch (error) {
    res.status(404).send("Product not found");
  }
});

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
router.get("/searchProduct", searchProduct);

// Authentication Routes
router.get("/forgot-password-page", forgotPasswordPage);
router.get("/login", login);
router.get("/otpverification", otpverification);
router.get("/reset-password", resetPassword);
router.get("/logout", logOut);

// Exporting the router to be used in other parts of the application
module.exports = router;
