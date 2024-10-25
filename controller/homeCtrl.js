const productModel = require("../models/ProductModeles");
const categoryModel = require("../models/CategoryModels");

const home = async (req, res) => {
  const { userId, isLoggedIn } = req.session;
  const categories = await categoryModel.find()
  const products = await productModel.find().populate("category");

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
  // const categoryName = req.params.name;
  // console.log(categoryName);
  
  // const categoryProducts = await productModel.find({category:categoryId});
  const products = await productModel.find();
  // console.log(products);
  

  res.render("home/category", {
    isLoggedIn: req.session?.isLoggedIn,
    // categoryName,
    categories,
    products,
    // categoryProducts,
  });
};

const searchProduct = async (req,res)=>{
  try{
    const {query} = req.query;
    const products = await productModel.find({
      name:{$regex:query,$options:'i'}
    }).populate(({
      path:'category',
      match:{name:{$regex:query,$options:'i'}}
    }));
    res.status(200).json({success:true,products});
  }catch(err){
    console.error(err.message);
    res.status(500).json({success:false,message:'internal server error'});
    
  }
}
const detail = async (req, res) => {
  const { isLoggedIn, email, userId } = req.session;
  const categories = await categoryModel.find();
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
  searchProduct,
};
