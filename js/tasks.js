/**
 * Tasks Module
 * Handles the task list functionality for the Pomodoro timer.
 */

// DOM Elements
let taskInput;
let taskList;
let addTaskBtn;
let clearTasksBtn;

/**
 * Add a new task to the list
 */
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    // Create new task item
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    // Create task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = taskText;
    
    // Create task actions
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    // Create complete button
    const completeBtn = document.createElement('button');
    completeBtn.className = 'task-btn complete-btn';
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.title = 'Mark as completed';
    completeBtn.addEventListener('click', () => toggleTaskComplete(taskItem));
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-btn delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    
    // Assemble task item
    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(taskActions);
    
    // Add to list
    taskList.appendChild(taskItem);
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Save tasks
    saveTasks();
}

/**
 * Toggle task completion status
 * @param {HTMLElement} taskItem - The task item element
 */
function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks();
}

/**
 * Delete a task from the list
 * @param {HTMLElement} taskItem - The task item element
 */
function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

/**
 * Clear all tasks from the list
 */
function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        taskList.innerHTML = '';
        saveTasks();
    }
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('pomodoroTasks')) || [];
    
    savedTasks.forEach(task => {
        // Create new task item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        // Create task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = task.text;
        
        // Create task actions
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        // Create complete button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'task-btn complete-btn';
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.title = 'Mark as completed';
        completeBtn.addEventListener('click', () => toggleTaskComplete(taskItem));
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));
        
        // Assemble task item
        taskActions.appendChild(completeBtn);
        taskActions.appendChild(deleteBtn);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(taskActions);
        
        // Add to list
        taskList.appendChild(taskItem);
    });
}

/**
 * Handle task input keypress (Enter key)
 * @param {KeyboardEvent} event - The keypress event
 */
function handleTaskInputKeypress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

/**
 * Initialize the tasks module
 */
function initTasks() {
    // Get DOM elements
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');
    addTaskBtn = document.getElementById('add-task-btn');
    clearTasksBtn = document.getElementById('clear-tasks-btn');
    
    // Add event listeners
    addTaskBtn.addEventListener('click', addTask);
    clearTasksBtn.addEventListener('click', clearTasks);
    taskInput.addEventListener('keypress', handleTaskInputKeypress);
    
    // Load saved tasks
    loadTasks();
}

// Initialize tasks when DOM is loaded
document.addEventListener('DOMContentLoaded', initTasks);
