import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleSave = () => {
        if (editValue.trim() && editValue !== task.title) {
            onUpdate(task.id, { title: editValue });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(task.title);
        setIsEditing(false);
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`task-item ${task.completed ? 'task-completed' : ''}`}
        >
            <div 
                className={`checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onUpdate(task.id, { completed: !task.completed })}
            >
                {task.completed && <Check size={14} color="white" />}
            </div>
            
            <div className="task-content">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                        autoFocus
                        className="edit-input"
                    />
                ) : (
                    <span>{task.title}</span>
                )}
            </div>

            <div className="task-actions">
                {isEditing ? (
                    <button className="btn-icon" onClick={handleCancel}>
                        <X size={18} />
                    </button>
                ) : (
                    <>
                        {!task.completed && (
                            <button className="btn-icon" onClick={() => setIsEditing(true)}>
                                <Edit2 size={18} />
                            </button>
                        )}
                        <button 
                            className="btn-icon btn-delete" 
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash2 size={18} />
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default TaskItem;
