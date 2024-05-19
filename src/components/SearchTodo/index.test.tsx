import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../pages/Home";

describe('Search Component', () => {
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