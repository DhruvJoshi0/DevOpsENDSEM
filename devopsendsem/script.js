const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const task = taskInput.value.trim();
    
    if (task === '') {
        alert('Please enter a task!');
        return;
    }
    
    const taskItem = {
        id: Date.now(),
        text: task,
        completed: false
    };
    
    createTaskElement(taskItem);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
}

function createTaskElement(taskItem) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (taskItem.completed) {
        li.classList.add('completed');
    }
    
    li.innerHTML = `
        <span class="task-text">${taskItem.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    // Toggle completion
    li.querySelector('.task-text').addEventListener('click', () => {
        li.classList.toggle('completed');
        taskItem.completed = !taskItem.completed;
        saveTasks();
    });
    
    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const completed = item.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((task, index) => {
            const taskItem = {
                id: index,
                text: task.text,
                completed: task.completed
            };
            createTaskElement(taskItem);
        });
    }
}
