import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    searchHandlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchTodo({ searchHandlerChange }: Props) {
    return (
        <div className="flex justify-end">
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'right', alignSelf: 'right' }}
                className='mb-5 !shadow-sm !rounded-full !px-2 !py-1 !w-[2.7rem] hover:!w-[10rem] !transition-all !duration-1000 !relative'
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Task"
                    className='!pr-8 !text-wrap'
                    onChange={searchHandlerChange}
                />
                <IconButton type="button" className='!absolute !top-0 !right-0 !bg-white' aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}