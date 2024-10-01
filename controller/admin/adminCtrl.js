const adminPage = (req, res) => {
  res.render("adminSide/admin");
};
const products = (req,res)=>{
  res.render("adminSide/products");
}
const orders = (req,res)=>{
  res.render("adminSide/orders");
}
const customers = (req,res)=>{
  res.render("adminSide/customers");
}
const categories = (req,res)=>{
  res.render("adminSide/categories");
}
const reports= (req,res)=>{
  res.render("adminSide/reports");
}
const settings = (req,res)=>{
  res.render("adminSide/settings");
}

module.exports = {
  adminPage,
  products,
  orders,
  customers,
  categories,
  reports,
  settings
};
