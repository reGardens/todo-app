import Home from "./index";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from 'react';

describe("Home component", () => {
    it('renders input field and add button', () => {
        render(<Home />);

        const inputField = screen.getByPlaceholderText(/Add note/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        expect(inputField).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('allows user to add todo', async () => {
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
    });

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

    test('allows user to search todos', async () => {
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

        const searchInput = screen.getByPlaceholderText(/search task/i);
        userEvent.type(searchInput, 'New Task Tester');

        const newTodo = await screen.findByText('New Task Tester');
        expect(newTodo).toBeInTheDocument();
    });
})