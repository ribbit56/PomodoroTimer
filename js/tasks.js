/**
 * Tasks Module
 * Handles the task list functionality for the Pomodoro timer.
 */

// DOM Elements
let taskInput;
let taskList;
let addTaskBtn;
let clearTasksBtn;
let currentEditingTask = null;

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
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'task-btn edit-btn';
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editBtn.title = 'Edit task';
    editBtn.addEventListener('click', () => editTask(taskItem));
    
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
    taskActions.appendChild(editBtn);
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
 * Edit a task
 * @param {HTMLElement} taskItem - The task item element to edit
 */
function editTask(taskItem) {
    // If already editing another task, save that one first
    if (currentEditingTask && currentEditingTask !== taskItem) {
        saveEditedTask(currentEditingTask);
    }
    
    // Get the task text element
    const taskTextSpan = taskItem.querySelector('.task-text');
    const currentText = taskTextSpan.textContent;
    
    // Create an input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'task-edit-input';
    inputField.value = currentText;
    
    // Replace the text span with the input field
    taskTextSpan.style.display = 'none';
    taskItem.insertBefore(inputField, taskTextSpan);
    
    // Focus the input field
    inputField.focus();
    
    // Add event listeners for saving
    inputField.addEventListener('blur', () => saveEditedTask(taskItem));
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveEditedTask(taskItem);
        } else if (event.key === 'Escape') {
            cancelEdit(taskItem);
        }
    });
    
    // Mark this task as being edited
    currentEditingTask = taskItem;
    taskItem.classList.add('editing');
}

/**
 * Save an edited task
 * @param {HTMLElement} taskItem - The task item being edited
 */
function saveEditedTask(taskItem) {
    const inputField = taskItem.querySelector('.task-edit-input');
    const taskTextSpan = taskItem.querySelector('.task-text');
    
    if (inputField && taskTextSpan) {
        // Update the text content if the input has a value
        if (inputField.value.trim() !== '') {
            taskTextSpan.textContent = inputField.value.trim();
        }
        
        // Show the text span again
        taskTextSpan.style.display = '';
        
        // Remove the input field
        inputField.remove();
        
        // Remove editing class
        taskItem.classList.remove('editing');
        
        // Clear current editing task reference
        if (currentEditingTask === taskItem) {
            currentEditingTask = null;
        }
        
        // Save tasks to localStorage
        saveTasks();
    }
}

/**
 * Cancel editing a task
 * @param {HTMLElement} taskItem - The task item being edited
 */
function cancelEdit(taskItem) {
    const inputField = taskItem.querySelector('.task-edit-input');
    const taskTextSpan = taskItem.querySelector('.task-text');
    
    if (inputField && taskTextSpan) {
        // Show the text span again without changing its content
        taskTextSpan.style.display = '';
        
        // Remove the input field
        inputField.remove();
        
        // Remove editing class
        taskItem.classList.remove('editing');
        
        // Clear current editing task reference
        if (currentEditingTask === taskItem) {
            currentEditingTask = null;
        }
    }
}

/**
 * Delete a task from the list
 * @param {HTMLElement} taskItem - The task item element
 */
function deleteTask(taskItem) {
    // If this task is being edited, clear the reference
    if (currentEditingTask === taskItem) {
        currentEditingTask = null;
    }
    
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
        
        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'task-btn edit-btn';
        editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editBtn.title = 'Edit task';
        editBtn.addEventListener('click', () => editTask(taskItem));
        
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
        taskActions.appendChild(editBtn);
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
