import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import Home from "../../pages/Home";
import userEvent from "@testing-library/user-event";
import { act } from 'react';

describe('Edit Component, Delete Component', () => {
    it('allows user to edit todo', async () => {
        render(<Home />);

        const inputField = screen.getByPlaceholderText(/Add note/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        await waitFor(() => {
            expect(screen.queryByText('New Task Tester')).not.toBeInTheDocument();
        });

        fireEvent.change(inputField, { target: { value: 'New Task Tester' } });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText('New Task Tester')).toBeInTheDocument();
        }, { timeout: 5000 });

        await waitFor(() => {
            const editButton = screen.getByRole('button', { name: /edit/i });
            fireEvent.click(editButton);
        }, { timeout: 6000 })

        userEvent.clear(screen.getByPlaceholderText(/Add note/i));
        const updatedText = 'Updated New Task Tester';
        userEvent.type(screen.getByPlaceholderText(/Add note/i), updatedText);
        fireEvent.click(screen.getByRole('button', { name: /update/i }));
    });

    test('allows user to delete todo', async () => {
        render(<Home />);

        const inputField = screen.getByPlaceholderText(/Add note/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        await waitFor(() => {
            expect(screen.queryByText('New Task Tester')).not.toBeInTheDocument();
        });

        await act(async () => {
            fireEvent.change(inputField, { target: { value: 'New Task Tester' } });
            fireEvent.click(addButton);
        });

        await waitFor(() => {
            expect(screen.getByText('New Task Tester')).toBeInTheDocument();
        }, { timeout: 5000 });

        const deleteButton = screen.getByRole('button', { name: /delete/i });

        await act(async () => {
            fireEvent.click(deleteButton);
        });
    });
})