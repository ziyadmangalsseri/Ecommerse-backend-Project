const productModel = require("../models/ProductModeles");

const home = async (req, res) => {

  const {userId , isLoggedIn} = req.session;
  const products = await productModel.find();

  res.render("home/home",{title:'home',isLoggedIn:req.session?.isLoggedIn,products});
};
const logOut = (req,res) =>{
  req.session.destroy();
  res.redirect("/home");  
}
const forgotPasswordPage = (req, res) => {
  res.render("userSide/forgot-password-page");
};
const login = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("userSide/sign-in",{title:'login',isLoggedIn:req.session?.isLoggedIn});
};
const otpverification = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("userSide/otpVerification",{isLoggedIn:req.session?.isLoggedIn});
};
const resetPassword = (req, res) => {
  res.render("userSide/reset-password",{isLoggedIn:req.session?.isLoggedIn});
};

const category = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/category",{isLoggedIn:req.session?.isLoggedIn});
};
const detail = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/detail",{isLoggedIn:req.session?.isLoggedIn});
};
const shoppingCart = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/shopping-cart",{isLoggedIn:req.session?.isLoggedIn});
};
const checkout = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/checkout",{isLoggedIn:req.session?.isLoggedIn});
};
const blog = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/blog",{isLoggedIn:req.session?.isLoggedIn});
};
const blogDetails = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/blog-details",{isLoggedIn:req.session?.isLoggedIn});
};
const contact = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/contact",{isLoggedIn:req.session?.isLoggedIn});
};
const myWishlist = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/my-wishlist",{isLoggedIn:req.session?.isLoggedIn});
};
const termsConditions = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/terms-conditions",{isLoggedIn:req.session?.isLoggedIn});
};
const trakOrders = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/track-orders",{isLoggedIn:req.session?.isLoggedIn});
};
const faq = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/faq",{isLoggedIn:req.session?.isLoggedIn});
};
const error = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/404",{isLoggedIn:req.session?.isLoggedIn});
};
const myAccount = (req, res) => {
  const {isLoggedIn,email,userId} = req.session;
  res.render("home/myAccount",{isLoggedIn:req.session?.isLoggedIn});
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
