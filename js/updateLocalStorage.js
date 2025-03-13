export function updateLocalStorage(updatedTodo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}