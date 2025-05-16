/**
 * Notifications Module
 * Handles browser notifications and in-app notifications for the Pomodoro timer.
 */

// DOM Elements
const notificationElement = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const notificationCloseBtn = document.getElementById('notification-close');

// Audio elements for notifications
let bellSound;

/**
 * Initialize notification system
 */
function initNotifications() {
    // Create audio element for notification sound
    bellSound = new Audio();
    bellSound.src = 'assets/sounds/bell.mp3';
    bellSound.preload = 'auto';
    
    // Set up event listener for notification close button
    notificationCloseBtn.addEventListener('click', hideNotification);
    
    // Request browser notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

/**
 * Show in-app notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
function showNotification(title, message) {
    // In-app notification
    notificationMessage.innerHTML = `<strong>${title}</strong><br>${message}`;
    notificationElement.classList.remove('hidden');
    
    // Play sound if enabled
    const soundEnabled = document.getElementById('sound-enabled').checked;
    if (soundEnabled && bellSound) {
        bellSound.play().catch(error => {
            console.warn('Could not play notification sound:', error);
        });
    }
    
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
            icon: 'assets/icons/favicon.ico'
        });
        
        // Close browser notification after 5 seconds
        setTimeout(() => notification.close(), 5000);
    }
    
    // Auto-hide in-app notification after 5 seconds
    setTimeout(hideNotification, 5000);
}

/**
 * Hide in-app notification
 */
function hideNotification() {
    notificationElement.classList.add('hidden');
}

// Initialize notifications when DOM is loaded
document.addEventListener('DOMContentLoaded', initNotifications);
