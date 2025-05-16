/**
 * Motivational Quotes Module
 * Contains a collection of inspirational quotes and functions to display them.
 */

// Collection of motivational quotes
const quotes = [
    {
        text: "Productivity is never an accident. It is always the result of intelligent effort.",
        author: "Paul J. Meyer"
    },
    {
        text: "Focus on being productive instead of busy.",
        author: "Tim Ferriss"
    },
    {
        text: "You can do anything, but not everything.",
        author: "David Allen"
    },
    {
        text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        author: "Stephen Covey"
    },
    {
        text: "It's not knowing what to do, it's doing what you know.",
        author: "Tony Robbins"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    }
];

/**
 * Get a random quote from the collection
 * @returns {Object} A random quote object with text and author properties
 */
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Display a random quote in the quote container
 */
function displayRandomQuote() {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    const quote = getRandomQuote();
    
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    
    // Hide the quote container initially
    quoteContainer.classList.remove('visible');
    
    // Show the quote with a fade-in animation
    setTimeout(() => {
        quoteContainer.classList.add('visible');
    }, 500);
}
