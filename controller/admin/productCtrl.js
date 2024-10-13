const categoryModel = require("../../models/CategoryModels");

// product page
const products = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.render("adminSide/products", { categories });
  } catch (err) {
    console.error(err.message);
  }
};

// add product
const addProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, stockQuantity } = req.body;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  products,
  addProduct,
};
