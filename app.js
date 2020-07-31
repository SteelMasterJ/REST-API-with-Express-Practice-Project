const express = require('express');
const app = express();

//Send a get request to /quotes to see a list of quotes
app.get('/quotes', (req, res) =>{
    res.json(data);
});

//send a get request to /quotes/:id to see a quote

app.get('/quotes/:id', (req, res) =>{
    const quote = data.quotes.find(quote => quote.id == req.params.id);
    res.json(quote);
});
//send a post request to /quotes create a new quote
//send a PUT request to /quotes/:id to edit/update a quote
// send a DELETE request to /quotes/:id to delete a quote
//send a GET request to /quotes/quote/random to see a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

const data = {
    quotes: [
      {
        id: 8721,
        quote: "We must accept finite disappointment, but we must never lose infinite hope.",
        author: "Martin Luther King"
      },
      {
        id: 5779,
        quote: "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
        author: "Yvonne Pierre"
      },
      {
        id: 3406,
        quote: "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
        author: "Barbara DeAngelis"
      }
    ]
  }