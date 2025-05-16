/**
 * Rain Effect Module
 * Creates a rain animation effect in the background of the app.
 * Converted from jQuery to vanilla JavaScript.
 */

/**
 * Creates raindrops and adds them to the DOM
 */
function makeItRain() {
  // Clear out everything
  const frontRow = document.querySelector('.rain.front-row');
  const backRow = document.querySelector('.rain.back-row');
  
  frontRow.innerHTML = '';
  backRow.innerHTML = '';

  let increment = 0;
  let drops = '';
  let backDrops = '';

  while (increment < 100) {
    // Couple random numbers to use for various randomizations
    // Random number between 98 and 1
    const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    // Random number between 5 and 2
    const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    
    // Increment
    increment += randoFiver;
    
    // Add in a new raindrop with various randomizations to certain CSS properties
    drops += `<div class="drop" style="left: ${increment}%; bottom: ${(randoFiver + randoFiver - 1 + 100)}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
      <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
      <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
    </div>`;
    
    backDrops += `<div class="drop" style="right: ${increment}%; bottom: ${(randoFiver + randoFiver - 1 + 100)}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
      <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
      <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
    </div>`;
  }

  frontRow.innerHTML = drops;
  backRow.innerHTML = backDrops;
}

/**
 * Initialize the rain effect
 */
function initRain() {
  // We'll keep the splat and back-row effects enabled by default
  // The classes are already added to the HTML element in index.html
  
  // Make it rain initially
  makeItRain();
  
  // Adjust rain effect when theme changes
  document.addEventListener('themeChanged', function(e) {
    // This event is fired from theme.js when the theme changes
    // We don't need to do anything special, as the CSS handles the color changes
  });
}

// Initialize rain effect when DOM is loaded
document.addEventListener('DOMContentLoaded', initRain);
