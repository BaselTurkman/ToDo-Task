import { putRequest } from "./putRequest.js";
import { updateLocalStorage } from "./updateLocalStorage.js";

export function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

export function createEditableCell(todo) {
    const cell = document.createElement("td");
    cell.className = `todo-text ${todo.completed ? "completed" : ""}`;
    cell.textContent = todo.todo;
    cell.contentEditable = "false";

    cell.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            cell.contentEditable = "false";
            todo.todo = cell.textContent.trim();
            updateTask(todo);
        }
    });

    cell.addEventListener("blur", () => {
        cell.contentEditable = "false";
        todo.todo = cell.textContent.trim();
        updateTask(todo);
    });

    return cell;
}

function updateTask(updatedTodo) {
    updateLocalStorage(updatedTodo);
    putRequest(updatedTodo);
}

export function createStatusCell(todo) {
    const cell = document.createElement("td");
    cell.className = `status ${todo.completed ? "completed-status" : "pending-status"}`;
    cell.textContent = todo.completed ? "Completed" : "Pending";
    return cell;
}

export function createButton(text, className, id, clickHandler) {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.dataset.id = id;
    button.addEventListener("click", clickHandler);
    return button;
}
