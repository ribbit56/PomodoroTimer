/**
 * Timer Module
 * Handles the Pomodoro timer functionality with visual progress indicator.
 */

// DOM Elements
const timerDisplay = document.getElementById('timer');
const timerLabel = document.getElementById('timer-label');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const skipBtn = document.getElementById('skip-btn');
const progressRing = document.querySelector('.progress-ring-circle');

// Timer state
let timerState = {
    mode: 'focus', // 'focus', 'break', or 'longBreak'
    timeRemaining: 25 * 60, // in seconds
    totalDuration: 25 * 60, // in seconds
    isRunning: false,
    interval: null,
    sessionsCompleted: 0
};

// Settings
let settings = {
    focusDuration: 25, // in minutes
    breakDuration: 5, // in minutes
    longBreakDuration: 15, // in minutes
    sessionsUntilLongBreak: 4,
    soundEnabled: true,
    autoStartBreaks: false,
    autoStartFocus: false
};

// Calculate the circumference of the progress ring
const progressRingCircumference = 2 * Math.PI * 120; // 2πr where r=120

/**
 * Format time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (MM:SS)
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Update the timer display and progress ring
 */
function updateTimerDisplay() {
    // Update time text
    timerDisplay.textContent = formatTime(timerState.timeRemaining);
    
    // Update progress ring
    const progress = (timerState.totalDuration - timerState.timeRemaining) / timerState.totalDuration;
    const dashoffset = progressRingCircumference * (1 - progress);
    progressRing.style.strokeDashoffset = dashoffset;
    
    // Update document title
    document.title = `${formatTime(timerState.timeRemaining)} - Pomodoro Timer`;
}

/**
 * Load settings from local storage
 */
function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
    if (savedSettings) {
        settings = { ...settings, ...savedSettings };
    }
    
    // Update input fields with loaded settings
    document.getElementById('focus-duration').value = settings.focusDuration;
    document.getElementById('break-duration').value = settings.breakDuration;
    document.getElementById('long-break-duration').value = settings.longBreakDuration;
    document.getElementById('sessions-until-long-break').value = settings.sessionsUntilLongBreak;
    document.getElementById('sound-enabled').checked = settings.soundEnabled;
    document.getElementById('auto-start-breaks').checked = settings.autoStartBreaks;
    document.getElementById('auto-start-focus').checked = settings.autoStartFocus;
}

/**
 * Save settings to local storage
 */
function saveSettings() {
    settings.focusDuration = parseInt(document.getElementById('focus-duration').value, 10);
    settings.breakDuration = parseInt(document.getElementById('break-duration').value, 10);
    settings.longBreakDuration = parseInt(document.getElementById('long-break-duration').value, 10);
    settings.sessionsUntilLongBreak = parseInt(document.getElementById('sessions-until-long-break').value, 10);
    settings.soundEnabled = document.getElementById('sound-enabled').checked;
    settings.autoStartBreaks = document.getElementById('auto-start-breaks').checked;
    settings.autoStartFocus = document.getElementById('auto-start-focus').checked;
    
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
}

/**
 * Start the timer
 */
function startTimer() {
    if (timerState.isRunning) return;
    
    timerState.isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // If starting a new focus session, display a motivational quote
    if (timerState.mode === 'focus' && timerState.timeRemaining === timerState.totalDuration) {
        displayRandomQuote();
    }
    
    timerState.interval = setInterval(() => {
        timerState.timeRemaining--;
        updateTimerDisplay();
        
        if (timerState.timeRemaining <= 0) {
            completeTimer();
        }
    }, 1000);
}

/**
 * Pause the timer
 */
function pauseTimer() {
    if (!timerState.isRunning) return;
    
    timerState.isRunning = false;
    clearInterval(timerState.interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

/**
 * Reset the timer to the current mode's duration
 */
function resetTimer() {
    pauseTimer();
    
    // Reset time based on current mode
    if (timerState.mode === 'focus') {
        timerState.timeRemaining = settings.focusDuration * 60;
        timerState.totalDuration = settings.focusDuration * 60;
    } else if (timerState.mode === 'break') {
        timerState.timeRemaining = settings.breakDuration * 60;
        timerState.totalDuration = settings.breakDuration * 60;
    } else {
        timerState.timeRemaining = settings.longBreakDuration * 60;
        timerState.totalDuration = settings.longBreakDuration * 60;
    }
    
    updateTimerDisplay();
    
    // Hide quote when resetting
    document.getElementById('quote-container').classList.remove('visible');
}

/**
 * Handle timer completion
 */
function completeTimer() {
    pauseTimer();
    
    if (timerState.mode === 'focus') {
        // Completed a focus session
        timerState.sessionsCompleted++;
        updateStats();
        
        // Determine if it's time for a long break
        if (timerState.sessionsCompleted % settings.sessionsUntilLongBreak === 0) {
            switchMode('longBreak');
            showNotification('Time for a long break!', 'Take some time to relax and recharge.');
        } else {
            switchMode('break');
            showNotification('Break time!', 'Take a short break to refresh your mind.');
        }
        
        // Auto-start break if enabled
        if (settings.autoStartBreaks) {
            setTimeout(startTimer, 1000);
        }
    } else {
        // Completed a break
        switchMode('focus');
        showNotification('Focus time!', 'Ready to get back to work?');
        
        // Display a new motivational quote
        displayRandomQuote();
        
        // Auto-start focus if enabled
        if (settings.autoStartFocus) {
            setTimeout(startTimer, 1000);
        }
    }
}

/**
 * Skip the current timer and move to the next phase
 */
function skipTimer() {
    pauseTimer();
    
    if (timerState.mode === 'focus') {
        // Skip focus session and move to break
        // We still count it as completed for statistics
        timerState.sessionsCompleted++;
        updateStats();
        
        // Determine if it's time for a long break
        if (timerState.sessionsCompleted % settings.sessionsUntilLongBreak === 0) {
            switchMode('longBreak');
            showNotification('Skipped to long break', 'Take some time to relax and recharge.');
        } else {
            switchMode('break');
            showNotification('Skipped to break', 'Take a short break to refresh your mind.');
        }
    } else {
        // Skip break and move to focus
        switchMode('focus');
        showNotification('Skipped to focus time', 'Ready to get back to work?');
        
        // Display a new motivational quote
        displayRandomQuote();
    }
}

/**
 * Switch between focus and break modes
 * @param {string} mode - The mode to switch to ('focus', 'break', or 'longBreak')
 */
function switchMode(mode) {
    timerState.mode = mode;
    
    if (mode === 'focus') {
        timerLabel.textContent = 'Focus Time';
        timerState.timeRemaining = settings.focusDuration * 60;
        timerState.totalDuration = settings.focusDuration * 60;
        progressRing.style.stroke = 'var(--primary-color)';
    } else if (mode === 'break') {
        timerLabel.textContent = 'Break Time';
        timerState.timeRemaining = settings.breakDuration * 60;
        timerState.totalDuration = settings.breakDuration * 60;
        progressRing.style.stroke = 'var(--success-color)';
    } else {
        timerLabel.textContent = 'Long Break';
        timerState.timeRemaining = settings.longBreakDuration * 60;
        timerState.totalDuration = settings.longBreakDuration * 60;
        progressRing.style.stroke = 'var(--secondary-color)';
    }
    
    updateTimerDisplay();
}

/**
 * Update statistics display
 */
function updateStats() {
    const completedSessionsElement = document.getElementById('completed-sessions');
    const totalFocusTimeElement = document.getElementById('total-focus-time');
    const currentStreakElement = document.getElementById('current-streak');
    
    // Get current stats from local storage or initialize
    let stats = JSON.parse(localStorage.getItem('pomodoroStats')) || {
        completedSessions: 0,
        totalFocusMinutes: 0,
        currentStreak: 0,
        lastSessionDate: null
    };
    
    // Update stats
    stats.completedSessions++;
    stats.totalFocusMinutes += settings.focusDuration;
    
    // Update streak
    const today = new Date().toDateString();
    if (stats.lastSessionDate === today) {
        // Already completed a session today, streak continues
    } else if (stats.lastSessionDate) {
        // Check if the last session was yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday.toDateString() === stats.lastSessionDate) {
            stats.currentStreak++;
        } else {
            stats.currentStreak = 1; // Reset streak
        }
    } else {
        stats.currentStreak = 1; // First session ever
    }
    
    stats.lastSessionDate = today;
    
    // Save updated stats
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
    
    // Update UI
    completedSessionsElement.textContent = stats.completedSessions;
    totalFocusTimeElement.textContent = stats.totalFocusMinutes;
    currentStreakElement.textContent = stats.currentStreak;
}

/**
 * Initialize the timer
 */
function initTimer() {
    // Set up progress ring
    progressRing.style.strokeDasharray = progressRingCircumference;
    progressRing.style.strokeDashoffset = progressRingCircumference;
    
    // Load settings and stats
    loadSettings();
    
    // Set initial timer values based on settings
    timerState.timeRemaining = settings.focusDuration * 60;
    timerState.totalDuration = settings.focusDuration * 60;
    
    // Load and display stats
    const stats = JSON.parse(localStorage.getItem('pomodoroStats')) || {
        completedSessions: 0,
        totalFocusMinutes: 0,
        currentStreak: 0
    };
    
    document.getElementById('completed-sessions').textContent = stats.completedSessions;
    document.getElementById('total-focus-time').textContent = stats.totalFocusMinutes;
    document.getElementById('current-streak').textContent = stats.currentStreak;
    
    // Update timer display
    updateTimerDisplay();
    
    // Set up event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', skipTimer);
    
    // Set up settings change listeners
    const settingsInputs = document.querySelectorAll('.setting input');
    settingsInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveSettings();
            resetTimer(); // Reset timer with new settings
        });
    });
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', initTimer);
