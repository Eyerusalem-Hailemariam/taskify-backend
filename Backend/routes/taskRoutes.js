const express = require('express');
const router = express.Router();

const { getTask, createTask, updateTask, deleteTask, getAllTasks, getFilteredTasks } = require('../controllers/taskController');
const validateTask = require('../middleware/validation/validateTask');
const authorzie = require('../middleware/authorization');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/api/:id', getTask);
router.post('/api/create/:id', validateTask, createTask);
router.put('/api/:id', validateTask, updateTask);
router.delete('/api/:id', deleteTask);
router.get('/api/', authMiddleware, authorzie.authorizedRoles('admin'), getAllTasks);
router.get('/api/:id', getFilteredTasks);

module.exports = router;
