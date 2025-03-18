import { addTask } from "./addTask.js";
import { postRequest } from "./postRequest.js";
import { updateTaskCount } from "./updateTaskCount.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";

// Fetching TODO list from API
async function fetchTodos() {
    try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
            throw new Error(`Failed to fetch TODO, Status: ${response.status}`);
        }
        const data = await response.json();
        displayTodos(data.todos);
        localStorage.setItem("todos", JSON.stringify(data.todos));
    } catch (error) {
        console.error('Error Fetching To do Data:', error.message);
    }

}

// Function to display TODO list
function displayTodos(todos) {
    const todoTableBody = document.getElementById('todo-table-body');
    todoTableBody.innerHTML = ''; // Clear existing rows
    todos.forEach(todo => addTask(todo, todoTableBody));
}

function loadTodos() {
    try {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            displayTodos(JSON.parse(storedTodos));
        } else {
            fetchTodos();
        }
    } catch (error) {
        console.error("Error loading todos from local storage:", error.message);
        fetchTodos();
    }
}

// Load the TODO list when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add new TODO functionality
document.getElementById('add-todo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTodoInput = document.getElementById('new-todo');
    const todo = newTodoInput.value.trim();

    const newTodo = {
        todo,
        completed: false,
        userId: 5,
    }

    // Prevent adding empty TODO
    if (newTodo.todo === '') return;
    const todoTableBody = document.getElementById('todo-table-body');

    // Send new TODO to API
    try {
        const createdTodo = await postRequest(newTodo);

        // Check if the request was successful
        if (!createdTodo || createdTodo.success === false) {
            throw new Error(createdTodo?.message || "Failed to add TODO");
        }

        // Add new TODO to the DOM using the response data
        addTask(createdTodo, todoTableBody);
        saveToLocalStorage(createdTodo);

        // Clear input field after adding
        newTodoInput.value = '';
    } catch (error) {
        console.error('Error adding new TODO:', error.message);
    }
});

// Search TODOs functionality
document.getElementById('search-todo').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) return;
    try {
        const todos = JSON.parse(localStorage.getItem("todos"))
        const filteredTodos = todos.filter(todo => todo.todo.toLowerCase().includes(searchTerm));
        displayTodos(filteredTodos);
        updateTaskCount()
    } catch (error) {
        console.error("Error filtering todos:", error.message);
    }

});