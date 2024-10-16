const productModel = require("../../models/ProductModeles");
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
    const { name, price, category, description, stock } = req.body;

    if(!req.file){
      return res.status(400).json({message:"Product image is required"})
    }

    const productImage = req.file.path; // Access the uploaded image path 

    // Create a new product document 
    const newProduct = new productModel({
      name,
      price,
      category,
      image:productImage,
      description,
      stock
    });

    // Save the product in the database
    await newProduct.save();

    // Respond with a success message
    res.status(200).json({message:'Product added successfully'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'server error'});
  }
};

module.exports = {
  products,
  addProduct,
};
