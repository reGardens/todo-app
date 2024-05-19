import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../Layout';
import InputTodo from '../../components/InputTodo';
import SearchTodo from '../../components/SearchTodo';
import TodoList from '../../components/TodoList';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: string | null;
    searchValue: string;
}

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchValueText, setSearchValueText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleAddTodo = async () => {
        // Logic to add todo
        if (!isLoading && inputText.trim() !== '') {
            setIsLoading(true);
            if (editingId !== null) {
                // Edit existing todo
                const updatedTodos = todos.map(todo =>
                    todo.id === editingId ? { ...todo, text: inputText } : todo
                );
                setTimeout(() => {
                    Swal.fire({
                        title: "Update!",
                        text: "Your task has been update.",
                        icon: "success"
                    });
                    setTodos(updatedTodos);
                    setInputText('');
                }, 2000);
                setEditingId(null);
            } else {
                // Add new todo
                try {
                    // Fetch API Time
                    const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
                    const time = response.data.datetime;
                    const regexTime = /(\d{2}:\d{2}:\d{2})/;
                    const getTime = time.match(regexTime);
                    const newTodo: Todo = {
                        id: todos.length + 1,
                        text: inputText,
                        completed: false,
                        time: getTime[1],
                        searchValue: searchValueText,
                    };
                    setTimeout(() => {
                        Swal.fire({
                            title: "Create!",
                            text: "Your task has been create.",
                            icon: "success"
                        });
                        setTodos([...todos, newTodo]);
                        setInputText('');
                    }, 2000);

                } catch (error) {
                    console.error('Error fetching time:', error);
                }
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const handleEditTodo = (id: number, text: string) => {
        // Logic to edit todo
        setEditingId(id);
        setInputText(text);
    };

    const handleDeleteTodo = (id: number) => {
        // Logic to delete todo
        const updatedTodos = todos.filter(todo => todo.id !== id);

        Swal.fire({
            title: "Are you sure you want to Delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                    setTodos(updatedTodos);
                }, 2000);
            }
        });
    };

    const handleToggleComplete = (id: number) => {
        // Logic to mark todo as completed
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const searchHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValueText(e.target.value);
    };

    const filteredData = todos.filter((el) => {
        if (searchValueText === '') {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(searchValueText)
        }
    });

    return (
        <Layout>
            <div className=''>
                <p className='text-center font-bold text-2xl mt-8 mb-5'>To Do List</p>
                <InputTodo
                    isLoading={isLoading}
                    inputText={inputText}
                    handleInputChange={handleInputChange}
                    handleAddTodo={handleAddTodo}
                    editingId={editingId}
                />
                <SearchTodo searchHandlerChange={searchHandlerChange} />
                <TodoList
                    todos={filteredData}
                    handleEditTodo={handleEditTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleToggleComplete={handleToggleComplete}
                />
            </div>
        </Layout>
    );
}