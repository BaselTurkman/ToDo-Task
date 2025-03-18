export async function postRequest(data) {
    try {
        const response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to create TODO, Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error posting todos:", error.message);
        return { success: false, message: error.message };
    }
}