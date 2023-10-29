const express = require('express')
const router = express.Router()
const webpageController = require('../controller/webpageController')

router.get('/check-compliance', webpageController.checkWebpageCompliance)

module.exports = router