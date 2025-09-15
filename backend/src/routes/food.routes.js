const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food.controller');
const { authFoodPartnerMiddleware, authUserMiddleware } = require("../middlewares/authe.middlewares");
const { upload } = require('../middlewares/upload.middleware');

// ===============================
// Routes
// ===============================

// Create food (for food partners)
router.post(
    '/create',
    authFoodPartnerMiddleware,   // ✅ partner auth middleware
    upload.single('video'),      // ✅ handle video upload
    foodController.createFood
);

// Get all food items (public)
router.get('/', foodController.getFoodItems);

// Like a food item (for authenticated users)
router.post(
    '/like',
    authUserMiddleware,          // ✅ user auth middleware
    foodController.likeFood
);

// Save a food item (for authenticated users)
router.post(
    '/save',
    authUserMiddleware,          // ✅ user auth middleware
    foodController.saveFood
);
router.get('/save',
   authUserMiddleware,
    foodController.getSaveFood
)



module.exports = router;
