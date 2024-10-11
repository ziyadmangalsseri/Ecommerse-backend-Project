const { log } = require("debug/src/node");
const categoryModel = require("../../models/CategoryModels");
const express = require("express");

// Renders the category page with the list of categories
const categorypage = async (req, res) => {
  try {
    const Categories = await categoryModel.find();
    res.render("adminSide/categories", { Categories });
    // console.log(Categories);
    
  } catch (error) {
    console.error(error.message);
  }
};

// Adds a new category
const addNewCategory = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body;
    // const image = req.file; // Uncomment if image is being uploaded

    // Log the request body for debugging
    console.log("req.body is: ", req.body);

    // Validate if the required fields are present
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    // if (!image) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Image is required",
    //   });
    // }

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Create new category
    const newCategory = new categoryModel({
      name,
      description,
      // image: image.path, // Uncomment if image is being uploaded
      subcategories: subcategories || [],
    });

    // Save the new category to the database
    await newCategory.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Category added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Category

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId);
    
    await categoryModel.findByIdAndDelete(categoryId);
    res.redirect("/api/admin/categories");
  
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });  // fixed typo
  }
};



//  Edit Category

const editCategory = async (req,res)=>{
  try{
    const categoryId = req.params.id;
    console.log(categoryId);
    
    await categoryModel.findById(categoryId)
  }catch(err){
    console.error(err.message);
    
  }
}

// Export the functions for use in routes
module.exports = {
  addNewCategory,
  categorypage,
  deleteCategory,
  editCategory,
};
