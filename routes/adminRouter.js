const express = require('express');
const router = express.Router();
const adminPage = require('../controller/admin/adminCtrl')

router.get("/dashboard", adminPage);

module.exports = router;