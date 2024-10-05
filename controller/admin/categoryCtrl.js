const categoryModel = require("../../models/CategoryModels");
const express = require("express");


//add category model
const addNewCategory = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body;
    const image = req.file;

    // Log the request body and file for debugging
    console.log(req.body);
    console.log(req.file); // Check if Multer has correctly processed the file

    // Validate if the required fields are present
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const existingCategory = await categoryModel.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
      //   categoryInputName,
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "category already exists" });
    }
    const newCategory = new categoryModel({
      name,
      description,
      image: image.path,
      subcategories: subcategories ? subcategories.split(",") : [],
    });
    await newCategory.save();
    res
      .status(200)
      .json({ success: true, message: "category added successfully" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = addNewCategory;
