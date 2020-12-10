const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    loading();
    // Proxy request URL
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If no author quote set to unknown if response quoteAuthor is empty 
        authorText.innerText = (data.quoteAuthor == '') 
            ? 'Unknown'
            : data.quoteAuthor;

        // Reduce font size for long quotes
        quoteText.innerText = (data.quoteText.length > 120) 
            ? quoteText.classList.add('long-quote') 
            : quoteText.classList.remove('long-quote');
        quoteText.innerText = data.quoteText;
    } catch (error) {
        console.log('error: ' + error);
        quoteText.innerText = 'An error occured. Refresh or request new quote';
        authorText.hidden = true;
    }

    complete();
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterURL, '_blank');
}

// Event listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();