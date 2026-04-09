import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onAddTask(title);
            setTitle('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
            />
            <button type="submit" className="btn-primary" disabled={isSubmitting || !title.trim()}>
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Add
            </button>
        </form>
    );
};

export default TaskForm;
