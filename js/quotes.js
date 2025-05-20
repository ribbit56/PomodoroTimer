/**
 * Motivational Quotes Module
 * Contains a collection of inspirational quotes and functions to display them.
 */

// Collection of motivational quotes
const quotes = [
    {
        text: "Be tolerant with others and strict with yourself.",
        author: "Marcus Aurelius"
    },
    {
        text: "Because most of what we say and do is not essential. Ask yourself at every moment, 'Is this necessary?'",
        author: "Marcus Aurelius"
    },
    {
        text: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius"
    },
    {
        text: "You're better off not giving the small things more time than they deserve.",
        author: "Marcus Aurelius"
    },
    {
        text: "Luck is what happens when preparation meets opportunity.",
        author: "Seneca"
    },
    {
        text: "We suffer more often in imagination than in reality.",
        author: "Seneca"
    },
    {
        text: "They lose the day in expectation of the night, and the night in fear of the dawn.",
        author: "Seneca"
    },
    {
        text: "He suffers more than necessary, who suffers before it is necessary.",
        author: "Seneca"
    },
    {
        text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
        author: "Alexander Graham Bell"
    },
    {
        text: "The successful warrior is the average man, with laser-like focus.",
        author: "Bruce Lee"
    },
    {
        text: "It is wise to direct your anger towards problems – not people; to focus your energies on answers – not excuses.",
        author: "William Arthur Ward"
    },
    {
        text: "One look at an email can rob you of 15 minutes of focus. One call on your cell phone, one tweet, one instant message can destroy your schedule, forcing you to move meetings, or blow off really important things, like love, and friendship.",
        author: "Jacqueline Leo"
    },
    {
        text: "When walking, walk. When eating, eat.",
        author: "Zen proverb"
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
