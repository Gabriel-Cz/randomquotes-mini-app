const API = "https://quote-garden.herokuapp.com/api/v3/quotes/random";

class Quote {
    constructor(author, text, genre) {
        this.author = author;
        this.text = text;
        this.genre = genre;
    }
}

const renderElements = (quote) => {
    //Containers
    let quotesContainer = document.getElementById("quotesContainer");
    let theQuoteContainer = document.createElement("div");

    //Components of the QuoteContainer
    let theHeader = document.createElement("h1");
    let theGenre = document.createElement("div");
    let theContent = document.createElement("blockquote");
    
    //classes
    theQuoteContainer.className = "theQuoteContainer";
    theHeader.className = "quoteAuthor";
    theGenre.className = "quoteGenre";
    theContent.className = "quoteText";

    //Inject quote api content to the HTML DOM
    theHeader.innerHTML = quote.author;
    theGenre.innerHTML = quote.genre;
    theContent.innerHTML = quote.text;

    theQuoteContainer.appendChild(theHeader);
    theQuoteContainer.appendChild(theGenre);
    theQuoteContainer.appendChild(theContent);
    quotesContainer.appendChild(theQuoteContainer);

    //Render component on the DOM
    document.body.appendChild(quotesContainer);
}

const iconRotation = () => {
    document.getElementById('renewIcon').animate([
        { transform: 'rotate(-360deg)' },
        { transition: 'ease-in-out' },
    ], {
        duration: 750,
        iteration: 1
    })
}; 

const getRandomQuote = () => {
    iconRotation();
    fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log(data.data)
        data.data.map(genre => {
            let newQuote = new Quote(genre.quoteAuthor, genre.quoteText, genre.quoteGenre);
            setTimeout(() => {
                renderElements(newQuote);
        }, 600)
        })
    })
    .catch(e => console.log(e))
}
