document.addEventListener("DOMContentLoaded", () => {
    // Add Todo Functionality
    const addForm = document.querySelector(".add");
    const todoList = document.querySelector(".todos");
    const search = document.querySelector(".search input");

    // Add new todo
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoText = addForm.add.value.trim();

        if (todoText.length) {
            const newTodo = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${todoText}</span>
                    <i class="far fa-trash-alt delete"></i>
                </li>
            `;
            todoList.innerHTML += newTodo;
            addForm.reset();
        }
    });

    // Delete Todo Functionality
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        }
    });

    // Search Filter Functionality
    search.addEventListener("input", () => {
        const searchTerm = search.value.trim().toLowerCase();
        filterTodos(searchTerm);
    });

    // Filter Todos Helper Function
    const filterTodos = (term) => {
        Array.from(todoList.children)
            .filter((todo) => !todo.textContent.toLowerCase().includes(term))
            .forEach((todo) => todo.classList.add("filtered"));

        Array.from(todoList.children)
            .filter((todo) => todo.textContent.toLowerCase().includes(term))
            .forEach((todo) => todo.classList.remove("filtered"));
    };
});
