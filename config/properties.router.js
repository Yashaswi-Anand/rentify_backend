const express = require('express');
const propertiesController = require('../controller/properties.controller');
const router = express.Router();

router.get('/get_properties', propertiesController.getProperties);

router.post('/add_properties', propertiesController.addNewProperties);

router.post('/update_properties', propertiesController.updateProperties);

// router.post('/delete_properties', propertiesController.deleteProperties);

// router.post('/get_favorite_properties', propertiesController.getProperties);

module.exports = router;