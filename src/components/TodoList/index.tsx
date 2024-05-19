import TodoItem from '../TodoItem';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: string | null;
}

interface Props {
    todos: Todo[];
    handleEditTodo: (id: number, text: string) => void;
    handleDeleteTodo: (id: number) => void;
    handleToggleComplete: (id: number) => void;
}

export default function TodoList({ todos, handleEditTodo, handleDeleteTodo, handleToggleComplete }: Props) {
    return (
        <div className="bg-white px-4 py-5 rounded-xl">
            <ul className='grid gap-2'>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleToggleComplete={handleToggleComplete}
                    />
                ))}
            </ul>
        </div>
    );
}