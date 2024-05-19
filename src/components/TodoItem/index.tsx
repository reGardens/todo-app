import React from 'react';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: string | null;
}

interface Props {
    todo: Todo;
    handleEditTodo: (id: number, text: string) => void;
    handleDeleteTodo: (id: number) => void;
    handleToggleComplete: (id: number) => void;
}

export default function TodoItem({ todo, handleEditTodo, handleDeleteTodo, handleToggleComplete }: Props) {
    return (
        <li className={`li-trigger ${todo.completed ? 'opacity-25' : ''} flex justify-between items-center bg-slate-200 rounded-full px-4 py-2`}>
            <input className='!border-red-500 !rounded-full' type="checkbox" onClick={() => handleToggleComplete(todo.id)} name="" id="" />

            <p>
                <span className={`font-extrabold`}>{todo.text}</span>
                <span className='text-xs'> ({todo.time})</span>
            </p>

            <div className={`${todo.completed ? 'pointer-events-none' : ''} flex gap-2`}>
                <Button onClick={() => handleEditTodo(todo.id, todo.text)} aria-label="edit">
                    <CreateIcon sx={{ fontSize: '1.2rem' }} />
                </Button>
                <button onClick={() => handleDeleteTodo(todo.id)} aria-label="delete">
                    <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                </button>
            </div>
        </li>
    );
}