const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote from API
async function getQuote() {
    // Proxy request URL
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If no author quote set to unknown if response quoteAuthor is empty 
        authorText.innerText = (data.quoteAuthor == '') 
            ? data.quoteAuthor 
            : 'Unknown';

        // Reduce font size for long quotes
        quoteText.innerText = (data.quoteText.length > 120) 
            ? quoteText.classList.add('long-quote') 
            : quoteText.classList.remove('long-quote');
        console.log(data)
    } catch (error) {
        console.log('error: ' + error)
    }
}

// On load
// getQuote();