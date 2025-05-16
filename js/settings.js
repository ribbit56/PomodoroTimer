/**
 * Settings Module
 * Handles the settings dropdown functionality.
 */

// DOM Elements
const settingsHeader = document.getElementById('settings-header');
const settingsToggle = document.getElementById('settings-toggle');
const settingsContent = document.getElementById('settings-content');

/**
 * Toggle the settings dropdown
 */
function toggleSettings() {
    settingsContent.classList.toggle('open');
    settingsToggle.classList.toggle('open');
    
    // Save the state to localStorage
    const isOpen = settingsContent.classList.contains('open');
    localStorage.setItem('settingsOpen', isOpen);
}

/**
 * Initialize the settings dropdown
 */
function initSettings() {
    // Add click event to toggle settings
    settingsHeader.addEventListener('click', toggleSettings);
    
    // Check if settings should be open based on saved preference
    const savedState = localStorage.getItem('settingsOpen');
    if (savedState === 'true') {
        settingsContent.classList.add('open');
        settingsToggle.classList.add('open');
    }
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', initSettings);
