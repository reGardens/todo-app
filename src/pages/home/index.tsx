import React, {  useState } from 'react';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import { getTimeAsync } from '../../app/reducer';
// import { gsap } from "gsap";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: string | null;
}

export default function Home() {
    // const dispatch = useDispatch();
    // const { loading, data, error } = useSelector((state: RootState) => state.time);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    // const tl = gsap.timeline();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleAddTodo = async () => {
        if (!isLoading && inputText.trim() !== '') {
            setIsLoading(true);
            if (editingId !== null) {
                // Edit existing todo
                const updatedTodos = todos.map(todo =>
                    todo.id === editingId ? { ...todo, text: inputText } : todo
                );
                setTimeout(() => {
                    setTodos(updatedTodos);
                }, 2000);
                setEditingId(null);
            } else {
                // Add new todo
                try {
                    // Fetch API waktu
                    const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
                    const time = response.data.datetime;
                    const regexTime = /(\d{2}:\d{2}:\d{2})/;
                    const getTime = time.match(regexTime);
                    const newTodo: Todo = {
                        id: todos.length + 1,
                        text: inputText,
                        completed: false,
                        time: getTime[1],
                    };
                    setTimeout(() => {
                        setTodos([...todos, newTodo]);
                    }, 2000);

                    // const tween = gsap.to('.li-trigger', { duration: 1, y: 0, opacity: 1 });
                    // tl.add(tween)
                    //     .add(tween);
                    // tl.to('.li-trigger', { duration: 1, y: 0, opacity: 1 });
                } catch (error) {
                    console.error('Error fetching time:', error);
                }
            }

            setInputText('');
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
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

    // useEffect(() => {
    //     dispatch(getTimeAsync());
    // }, [dispatch])

    return (
        <Layout>
            <div className=''>
                <p className='text-center font-bold text-2xl mt-8 mb-5'>To Do List</p>

                <div className="flex justify-center relative mb-5">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        className='italic outline-none pl-4 pr-24 py-2 rounded-full w-full shadow-sm'
                        placeholder='Add node'
                    />
                    <Button onClick={handleAddTodo} className='!bg-red-400 !text-white !rounded-full !absolute !top-0 !right-0 !h-full !leading-none !normal-case w-20 !font-extrabold'>
                        {isLoading ? <div className="loader"></div> : (editingId !== null ? 'Update' : 'Add')}
                    </Button>
                </div>

                <div className="bg-white px-4 py-5 rounded-xl">
                    <ul className='grid gap-2'>
                        {todos.map(todo => (
                            <li key={todo.id} className={`li-trigger ${todo.completed ? 'opacity-25' : ''} flex justify-between items-center bg-slate-200 rounded-full px-4 py-2`}>
                                <input className='!border-red-500 !rounded-full' type="checkbox" onClick={() => handleToggleComplete(todo.id)} name="" id="" />

                                <p>
                                    <span className={`font-extrabold`}>{todo.text}</span>
                                    <span className='text-xs'> ({todo.time})</span>
                                </p>

                                <div className={`${todo.completed ? 'pointer-events-none' : ''} flex gap-2`}>
                                    <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                                        <CreateIcon sx={{ fontSize: '1.2rem' }} />
                                    </button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}>
                                        <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}