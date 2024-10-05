const express = require('express');
const router = express.Router();
const addNewCategory = require('../controller/admin/categoryCtrl');
const upload = require("../middlewares/upload");
const {
    adminPage,
    products,
    orders,
    customers,
    categories,
    reports,
    settings,
} = require('../controller/admin/adminCtrl')

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get("/dashboard", adminPage);
router.get("/products", products);
router.get("/orders", orders);
router.get("/customers", customers);

//categories
router.get("/categories", categories);
router.post("/addNewCategory", upload.single("image"), addNewCategory);


router.get("/reports", reports);
router.get("/settings", settings);




module.exports = router;