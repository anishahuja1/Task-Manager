const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '../data/tasks.json');

const readTasks = async () => {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(DATA_PATH, JSON.stringify([]));
            return [];
        }
        throw error;
    }
};

const writeTasks = async (tasks) => {
    await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
};

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === '') {
            const error = new Error('Title is required');
            error.statusCode = 400;
            throw error;
        }

        const tasks = await readTasks();
        const newTask = {
            id: uuidv4(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { completed, title } = req.body;
        const tasks = await readTasks();
        
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        if (completed !== undefined) tasks[taskIndex].completed = completed;
        if (title !== undefined) {
            if (title.trim() === '') {
                const error = new Error('Title cannot be empty');
                error.statusCode = 400;
                throw error;
            }
            tasks[taskIndex].title = title.trim();
        }

        await writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tasks = await readTasks();
        
        const filteredTasks = tasks.filter(t => t.id !== id);
        if (filteredTasks.length === tasks.length) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        await writeTasks(filteredTasks);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
