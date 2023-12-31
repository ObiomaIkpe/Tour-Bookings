const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/',authController.isLoggedIn, viewsController.getOverview);

router.get('/tour/:slug',authController.isLoggedIn, viewsController.getTour);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
//router.route('/logout').get(authController.logout); 

router.get('/me', authController.protect, viewsController.getAccount);

router.patch('/updateMe', authController.protect, viewsController.updateUserData);


router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
 
module.exports = router;