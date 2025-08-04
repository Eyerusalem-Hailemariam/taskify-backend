const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);
router.get('/api/user/:id', authMiddleware, authController.getUser);

module.exports = router;