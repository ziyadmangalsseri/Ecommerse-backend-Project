const express = require('express');
const router = express.Router();
const {
    addNewCategory,
    categorypage,
    deleteCategory,
    editCategoryPage,
    updateCategory,
} = require('../controller/admin/categoryCtrl');
// const upload = require("../middlewares/upload");
const {
    adminPage,
    orders,
    customers,
    reports,
    settings,
} = require('../controller/admin/adminCtrl')

// Product 
const {
    products,
} = require("../controller/admin/productCtrl")
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get("/dashboard", adminPage);
router.get("/products", products);
router.get("/orders", orders);
router.get("/customers", customers);

//categories
router.get("/categories", categorypage);
router.post("/addNewCategory", addNewCategory);
router.post("/deleteCategory/:id",deleteCategory);
router.get("/editCategory/:id",editCategoryPage);
router.post("/updateCategory/:id",updateCategory);


router.get("/reports", reports);
router.get("/settings", settings);




module.exports = router;