import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import Home from "../../pages/Home";

describe('Input Component', () => {
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
})