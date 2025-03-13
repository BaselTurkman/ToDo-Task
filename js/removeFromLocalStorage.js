export function removeFromLocalStorage(todoId){
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos = todos.filter((todo) => todo.id !== todoId )
    localStorage.setItem("todos", JSON.stringify(todos))
}