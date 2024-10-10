const mongoos = require("mongoose");

const productSchema = new mongoos.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    }
})

const product = mongoos.model("Product",productSchema);
module.exports = product;