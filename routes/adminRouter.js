const express = require('express');
const router = express.Router();
const {
    adminPage,
    products,
    orders,
    customers,
    categories,
    reports,
    settings,
} = require('../controller/admin/adminCtrl')

router.get("/dashboard", adminPage);
router.get("/products", products);
router.get("/orders", orders);
router.get("/customers", customers);
router.get("/categories", categories);
router.get("/reports", reports);
router.get("/settings", settings);




module.exports = router;