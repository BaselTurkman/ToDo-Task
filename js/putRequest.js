export async function putRequest(todo) {
    const response = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: todo.completed,
        })
    })
    const data = await response.json()
    console.log(data);
}