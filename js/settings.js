/**
 * Settings Module
 * Handles the settings dropdown functionality.
 */

// DOM Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsDropdownContent = document.getElementById('settings-dropdown-content');

/**
 * Toggle the settings dropdown
 */
function toggleSettings(e) {
    if (e) e.stopPropagation();
    settingsDropdownContent.classList.toggle('show');
    
    // Save the state to localStorage
    const isOpen = settingsDropdownContent.classList.contains('show');
    localStorage.setItem('settingsOpen', isOpen);
    
    console.log('Settings toggled, isOpen:', isOpen);
}

/**
 * Initialize the settings dropdown
 */
function initSettings() {
    if (!settingsBtn || !settingsDropdownContent) {
        console.error('Settings dropdown elements not found');
        return;
    }
    
    console.log('Settings elements found, initializing...');
    
    // Add click event to toggle settings
    settingsBtn.addEventListener('click', toggleSettings);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!settingsBtn.contains(e.target) && !settingsDropdownContent.contains(e.target)) {
            settingsDropdownContent.classList.remove('show');
        }
    });
    
    // Check if settings should be open based on saved preference
    const savedState = localStorage.getItem('settingsOpen');
    if (savedState === 'true') {
        settingsDropdownContent.classList.add('show');
    }
    
    console.log('Settings dropdown initialized');
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', initSettings);
