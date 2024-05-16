import React, { useState } from 'react';
import Layout from '../Layout';
import Button from '@mui/material/Button';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function Home() {
    // const [loading, isLoading] = useState<boolean>(false)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            if (editingId !== null) {
                // Edit existing todo
                const updatedTodos = todos.map(todo =>
                    todo.id === editingId ? { ...todo, text: inputText } : todo
                );
                setTodos(updatedTodos);
                setEditingId(null);
            } else {
                // Add new todo
                const newTodo: Todo = {
                    id: todos.length + 1,
                    text: inputText,
                    completed: false,
                };
                setTodos([...todos, newTodo]);
            }
            setInputText('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id: number, text: string) => {
        setEditingId(id);
        setInputText(text);
    };

    const handleToggleComplete = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <Layout>
            <div className=''>
                <p className='text-center font-bold text-2xl mt-8 mb-5'>To Do List</p>

                <div className="flex justify-center relative mb-5">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        className='italic outline-none px-4 py-2 rounded-full w-full shadow-sm'
                        placeholder='Add node'
                    />
                    <Button onClick={handleAddTodo} className='!bg-red-400 !text-white !rounded-full !absolute !top-0 !right-0 !h-full !leading-none !normal-case w-20 !font-extrabold'>
                        {editingId !== null ? 'Update' : 'Add'}
                    </Button>
                </div>

                <div className="bg-white px-4 py-5 rounded-xl">
                    <ul className='grid gap-2'>
                        {todos.map(todo => (
                            <li key={todo.id} className='flex justify-between bg-slate-200 rounded-full px-4 py-2'>
                                <button onClick={() => handleToggleComplete(todo.id)}>
                                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>

                                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </span>

                                <div className="">
                                    <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}