export async function deleteRequest(todoId) {
    const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
        method: 'DELETE',
      })
    const data = await response.json();
    console.log(data);
}