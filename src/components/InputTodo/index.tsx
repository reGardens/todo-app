import React from 'react';
import Button from '@mui/material/Button';

interface Props {
    isLoading: boolean;
    inputText: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: () => void;
    editingId: number | null;
}

export default function InputTodo({ isLoading, inputText, handleInputChange, handleAddTodo, editingId }: Props) {
    return (
        <div className="flex justify-center relative mb-5">
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className='italic outline-none pl-4 pr-24 py-2 rounded-full w-full shadow-sm'
                placeholder='Add note'
            />
            <Button onClick={handleAddTodo} className='!bg-red-400 !text-white !rounded-full !absolute !top-0 !right-0 !h-full !leading-none !normal-case w-20 !font-extrabold'>
                {isLoading ? <div className="loader" data-testid="loader"></div> : (editingId !== null ? 'Update' : 'Add')}
            </Button>
        </div>
    )
}