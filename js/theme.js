/**
 * Theme Module
 * Handles the light and dark mode theme toggle functionality.
 */

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = themeToggleBtn.querySelector('span');
const htmlElement = document.documentElement;

// Check for saved theme preference or use system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Check if user prefers dark mode at the OS level
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDarkMode ? 'dark' : 'light');
    }
}

// Apply the specified theme
function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    
    // Update button icon and text
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Emit a custom event for other modules to respond to theme changes
    const event = new CustomEvent('themeChanged', { detail: { theme: theme } });
    document.dispatchEvent(event);
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
}

// Event Listeners
themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);
