import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskService.getTasks();
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (title) => {
        try {
            const response = await taskService.createTask(title);
            setTasks([response.data, ...tasks]);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add task');
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const response = await taskService.updateTask(id, updates);
            setTasks(tasks.map(t => t.id === id ? response.data : t));
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    if (loading && tasks.length === 0) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="glass-card">
            <h1>Tasks</h1>
            
            {error && (
                <div className="error-message">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <TaskForm onAddTask={handleAddTask} />

            <div className="filter-tabs">
                {['all', 'active', 'completed'].map(f => (
                    <button 
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="task-list">
                <AnimatePresence>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onUpdate={handleUpdateTask}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="empty-state"
                        >
                            No tasks yet. Add one to get started!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskList;
