import { putRequest } from "./putRequest.js";
import { deleteRequest } from "./deleteRequest.js";
import { updateTaskCount } from "./updateTaskCount.js";
import { updateLocalStorage } from "./updateLocalStorage.js";
import { removeFromLocalStorage } from "./removeFromLocalStorage.js";

export function addTask(todo, todoTableBody) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${todo.id}</td>
        <td class="todo-text ${todo.completed ? 'completed' : ''}" contenteditable="false">
            ${todo.todo}
        </td>
        <td>${todo.userId}</td>
        <td class="status ${todo.completed ? 'completed-status' : 'pending-status'}">
            ${todo.completed ? 'Completed' : 'Pending'}
        </td>
        <td>
            <button class="edit-btn" data-id="${todo.id}">Edit</button>
            <button class="toggle-btn" data-id="${todo.id}">
                ${todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        </td>
    `;

    const todoText = row.querySelector('.todo-text');
    const editBtn = row.querySelector('.edit-btn');
    const statusCell = row.querySelector('.status');
    const toggleBtn = row.querySelector('.toggle-btn');

    // Handle task completion toggle
    toggleBtn.addEventListener('click', () => {
        const isCompleted = todoText.classList.toggle('completed');
        toggleBtn.textContent = isCompleted ? 'Undo' : 'Complete';
        statusCell.textContent = isCompleted ? 'Completed' : 'Pending';
        statusCell.classList.toggle('completed-status', isCompleted);
        statusCell.classList.toggle('pending-status', !isCompleted);
        todo.completed = isCompleted;
        putRequest(todo);
        updateLocalStorage(todo);
    });

    // Handle task deletion
    row.querySelector('.delete-btn').addEventListener('click', () => {
        if(confirm("Do you want to delete this task?")) {
            row.remove();
            deleteRequest(todo.id);
            updateTaskCount();
            removeFromLocalStorage(todo.id);
        }
    });

    // Enable inline editing on button click
    editBtn.addEventListener('click', () => {
        todoText.contentEditable = "true";
        todoText.focus();
    });

    // Save edited task when Enter key is pressed
    todoText.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            todoText.contentEditable = "false";
            todo.todo = todoText.textContent.trim();
            updateTask(todo);
        }
    });

    todoTableBody.appendChild(row);
    updateTaskCount(); 
}

function updateTask(updatedTodo) {
    updateLocalStorage(updatedTodo);
    putRequest(updatedTodo);
}