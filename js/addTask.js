import { putRequest } from "./putRequest.js";
import { deleteRequest } from "./deleteRequest.js";
import { updateTaskCount } from "./updateTaskCount.js";
import { updateLocalStorage } from "./updateLocalStorage.js";
import { removeFromLocalStorage } from "./removeFromLocalStorage.js";
import { createButton, createCell, createEditableCell, createStatusCell } from "./domUtils.js";

export function addTask(todo, todoTableBody) {
    const row = document.createElement("tr");

    row.appendChild(createCell(todo.id));
    const todoTextCell = createEditableCell(todo);
    row.appendChild(todoTextCell);
    row.appendChild(createCell(todo.userId));
    row.appendChild(createStatusCell(todo));

    const actionCell = document.createElement("td");
    actionCell.appendChild(createButton("Edit", "edit-btn", todo.id, () => enableEditing(todoTextCell, todo)));
    actionCell.appendChild(createButton(todo.completed ? "Undo" : "Complete", "toggle-btn", todo.id, () => toggleCompletion(todo, todoTextCell, row)));
    actionCell.appendChild(createButton("Delete", "delete-btn", todo.id, () => deleteTask(row, todo)));

    row.appendChild(actionCell);
    todoTableBody.appendChild(row);

    updateTaskCount();
}

function enableEditing(cell, todo) {
    cell.contentEditable = "true";
    cell.focus();
}

function toggleCompletion(todo, cell, row) {
    const isCompleted = cell.classList.toggle("completed");
    const statusCell = row.querySelector(".status");
    const toggleBtn = row.querySelector(".toggle-btn");

    todo.completed = isCompleted;
    statusCell.textContent = isCompleted ? "Completed" : "Pending";
    toggleBtn.textContent = isCompleted ? "Undo" : "Complete";

    putRequest(todo);
    updateLocalStorage(todo);
}

function deleteTask(row, todo) {
    if (confirm("Do you want to delete this task?")) {
        row.remove();
        deleteRequest(todo.id);
        updateTaskCount();
        removeFromLocalStorage(todo.id);
    }
}