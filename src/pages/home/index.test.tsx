import Home from "./index";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Home component", () => {
    it('renders input field and add button', () => {
        render(<Home />);

        const inputField = screen.getByPlaceholderText(/Add note/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        expect(inputField).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    // it('allows user to add todo', async () => {
    //     render(<Home />);

    //     const inputField = screen.getByPlaceholderText(/Add note/i);
    //     const addButton = screen.getByRole('button', { name: /add/i });
    //     const newTodoText = 'New Todo';
    //     const initialLiElements = screen.getAllByRole('listitem').length;

    //     userEvent.type(inputField, newTodoText);
    //     fireEvent.click(addButton);

    //     // const newTodoElement = await screen.findByText(newTodoText);

    //     // expect(newTodoElement).toBeInTheDocument();

    //     await waitFor(() => {
    //         // Menghitung jumlah elemen <li> setelah menambahkan todo baru
    //         const updatedLiElements = screen.getAllByRole('listitem').length;

    //         // Memastikan jumlah elemen <li> bertambah setelah menambahkan todo baru
    //         expect(updatedLiElements).toBe(initialLiElements + 1);

    //         // Memastikan bahwa elemen dengan teks todo baru muncul dalam daftar
    //         expect(screen.getByText(newTodoText)).toBeInTheDocument();
    //     });
    // });

    test('allows user to delete todo', async () => {
        render(<Home />);

        const deleteButton = await screen.findByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteButton).not.toBeInTheDocument();
        });
    });

    // test('allows user to edit todo', async () => {
    //     render(<Home />);
    //     const editButton = await screen.findByRole('button', { name: /edit/i });
    //     fireEvent.click(editButton);
    //     const updatedText = 'Updated Todo';
    //     userEvent.clear(screen.getByPlaceholderText(/Add note/i));
    //     userEvent.type(screen.getByPlaceholderText(/Add note/i), updatedText);
    //     fireEvent.click(screen.getByRole('button', { name: /update/i }));
    //     await waitFor(() => {
    //         const updatedTodoElement = screen.getByText((content, element) => {
    //             return element?.textContent === updatedText;
    //         });
    //         expect(updatedTodoElement).toBeInTheDocument();
    //     });
    // });

    // test('allows user to search todos', async () => {
    //     render(<Home />);
    //     const searchInput = screen.getByPlaceholderText(/search task/i);
    //     userEvent.type(searchInput, 'New Todo');
    //     const newTodo = await screen.findByText((content, element) => {
    //         return element?.textContent?.includes('New Todo');
    //     });
    //     expect(newTodo).toBeInTheDocument();
    // });

    // => test syntax
    // it("when input task is empty, button not working", async () => {
    //     render(<Home />)

    //     const buttonEl = screen.getByRole("button", { name: /add/i })

    //     expect(buttonEl).toBeEnabled()
    // })
    // it("when input task is available and button event click change name button to element loading animation", async () => {
    //     render(<Home />)

    //     const buttonEl = screen.getByRole("button", { name: /add/i })

    //     const handleClick = async () => {
    //         screen.findByTestId("loader")
    //     };

    //     fireEvent.click(buttonEl, handleClick);

    //     expect(buttonEl).toBeDisabled();
    //     expect(screen.getByTestId('loader')).toBeInTheDocument();
    // })
    // it("when isLoading true, take element loader", async () => {
    //     render(<Home />);

    //     const isLoading = true;

    //     const buttonEl = screen.getByText(''); // Anda dapat menyesuaikan dengan teks yang tepat pada tombol
    //     expect(buttonEl.textContent).toBe(''); // Memastikan teks tombol adalah loader
    // });
})