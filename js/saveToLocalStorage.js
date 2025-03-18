export function saveToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
}
