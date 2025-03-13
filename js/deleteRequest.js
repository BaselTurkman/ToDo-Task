export async function deleteRequest(todoId) {
  try {
      const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Todo deleted:', data);
  } catch (error) {
      console.error('Error deleting todo:', error.message);
  }
}
