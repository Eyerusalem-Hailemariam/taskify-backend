//taskController.js
const Task  = require('../models/taskModel');
const { StatusCodes } = require('http-status-codes');
const taskService = require('../services/taskService');

async function createTask(req, res, next) {
    const { title, description, priority, completed, dueDate } = req.body;
    const userId = req.params.id;

    console.log("title", userId);

    try {
        const task = await taskService.createTask({  title,
            description,
            userId,
            priority,
            completed,
            dueDate
         });

        if (!task) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Failed to create task" });
        }

        res.status(200).json({
                  status: "true",
                  message: "Task created successfully!",
                  data: task,
                });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
}

async function updateTask(req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;    
    try {
        const updatedTask = await taskService.updateTask(id, { title, description });

        if (!updatedTask) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Task not found" });
        }

        res.status(200).json({
                  status: "true",
                  message: "Task updated successfully!",
                });
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
}

async function getTask(req, res, next) {
    const { id } = req.params;

    try {
        const task = await taskService.getTask(id);

        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Task not found" });
        }

        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }   
}

async function getAllTasks(req, res, next) {
    const {page = 1, limit = 10} = req.query;

    try {
    const skip = (page - 1) * limit;
        const tasks = await taskService.getTasks({
            skip: parseInt(skip),
            limit: parseInt(limit),
        });

         return res.status(StatusCodes.OK).json(tasks);
    }catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
}

async function deleteTask(req, res, next) { 
    const { id } = req.params;

    try {
        const deletedTask = await taskService.deleteTask(id);

        if (!deletedTask) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Task not found" });
        }

        return res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
}

async function getFilteredTasks(req, res, next) {
    const filters = req.query;

    try {
        const tasks = await taskService.getFilteredTasks(filters);
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        console.error('Error fetching filtered tasks:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
}
module.exports = {
    createTask,
    updateTask,
    getTask,
    deleteTask,
    getFilteredTasks,
    getAllTasks
};
    