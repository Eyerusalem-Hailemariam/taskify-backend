const express = require('express');

const router = express.Router();

const authRouter = require('./authRoutes');
const taskRouter = require('./taskRoutes');


router.use(authRouter);
router.use(taskRouter);
module.exports = router;