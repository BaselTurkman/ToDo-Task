export function updateTaskCount() {
    const taskCount = document.querySelectorAll("tbody tr").length;        
    document.getElementById("task-count").textContent = `Total Tasks:  ${taskCount}`;
}