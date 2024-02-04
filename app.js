document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const task = createTaskElement(taskInput.value);
        taskList.appendChild(task);
        saveTask(taskInput.value);
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `
        <span>${taskText}</span>
        <div class="task-actions">
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    return task;
}

function completeTask(button) {
    const task = button.closest('.task');
    task.classList.add('completed');
}

function deleteTask(button) {
    const task = button.closest('.task');
    task.remove();
    updateLocalStorage();
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    tasks.forEach((taskText) => {
        const task = createTaskElement(taskText);
        taskList.appendChild(task);
    });
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task span')).map(task => task.innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
