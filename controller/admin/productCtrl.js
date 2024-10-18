const productModel = require("../../models/ProductModeles");
const categoryModel = require("../../models/CategoryModels");

// product page
const products = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    const products = await productModel.find();
    res.render("adminSide/products", { categories, products });
  } catch (err) {
    console.error(err.message);
  }
};

// add product
const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;
    const image = req.file ? req.file.filename : "";
    const findProduct = await productModel.findOne({ name: name });

    if (!name || !price || !category || !description || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }
    if (!findProduct) {
      // Create a new product document
      const newProduct = new productModel({
        name,
        price,
        category,
        image,
        description,
        stock,
      });

      // Save the product in the database
      await newProduct.save();

      // Respond with a success message
      res.status(200).json({ message: "Product added successfully" });
    } else {
      console.log("product already exists");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const products = await productModel.findById(productId);
    const Categories = await categoryModel.find();
    if (products) {
      res.render("adminSide/editProducts", { products, Categories });
    } else {
      res.status(400).json({ success: false, message: "product is not found" });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, category, description, stock, currentImage } = req.body;

    // Check if a new image was uploaded, else use the existing image
    const image = req.file ? req.file.filename : currentImage;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required." });
    }

    if (productId) {
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          category,
          image,
          description,
          stock,
        },
        { new: true } // Return the updated product
      );
      
      await updatedProduct.save();
      res.redirect("/api/admin/products");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteProduct = async (req,res) => {
  try{

    const productId = req.params.id;
    console.log(productId);
    
    if(productId){
      const deleteproduct = await productModel.findByIdAndDelete(productId);
      res.redirect("/api/admin/products");
    }else{
      console.log("product id is undefined");
      
    }

  }catch(err){
    console.error(err.message);
    res.status(500).json({success:false,message:"Internal server is error"})
  }
}


module.exports = {
  products,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
