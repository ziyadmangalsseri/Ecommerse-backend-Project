const productModel = require("../../models/ProductModeles");
const categoryModel = require("../../models/CategoryModels");

// product page
const products = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    const products = await productModel.find();
    res.render("adminSide/products", { categories,products });
  } catch (err) {
    console.error(err.message);
  }
};

// add product
const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;
    const image = req.file?req.file.filename:'';
    const findProduct = await productModel.findOne({name:name})


    if (!name || !price || !category || !description || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if(!req.file){
      return res.status(400).json({message:"Product image is required"})
    }
    if(!findProduct){

  

    // Create a new product document 
    const newProduct = new productModel({
      name,
      price,
      category,
      image,
      description,
      stock
    });

    // Save the product in the database
    await newProduct.save();

    // Respond with a success message
    res.status(200).json({message:'Product added successfully'});
  }else{
    console.log("product already exists");
    
  }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'server error'});
  }
};

module.exports = {
  products,
  addProduct,
};
