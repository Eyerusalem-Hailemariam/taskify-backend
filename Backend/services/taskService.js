//taskSevice.js
const taskModel = require('../models/taskModel');

async function createTask(taskData) {
    console.log("taskData", taskData);
    const { title, description, userId } = taskData;
    try {
        const newTask = new taskModel(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }

}

async function updateTask(id, taskData) {
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, taskData, { new: true });
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

async function getTask(id) {
    try {
        const task = await taskModel.findById(id);
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
}

async function getTasks({skip, limit}) {
    const tasks = await taskModel.find().skip(skip).limit(limit);
    return tasks;
}

async function deleteTask(id) {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        return deletedTask;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

async function getFilteredTasks(filters) {
    const query = {};

    if (filters.completed !== undefined) {
        query.completed = filters.completed;
    }
    if (filters.userId) {
        query.userId = filters.userId;
    }
    if (filters.title) {
        query.title = { $regex: filters.title, $options: 'i' }; 
    }
    if (filters.priority) {
        query.priority = filters.priority;
    }
    if (filters.dueDate) {
        query.dueDate = { $lte: new Date(filters.dueDate) }; 
    }

    return await taskModel.find(query);
};

module.exports = {
    createTask,
    updateTask, 
    getTask,
    getFilteredTasks,
    getTasks,
    deleteTask
};