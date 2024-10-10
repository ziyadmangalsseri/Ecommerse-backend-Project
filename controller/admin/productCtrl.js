const categoryModel = require("../../models/CategoryModels");

const products = async (req,res)=>{
    try{
        const categories = await categoryModel.find();
        res.render("adminSide/products",{categories});
    }catch(err){
        console.error(err.message);
        
    }
  }


  module.exports = {
    products,
  }