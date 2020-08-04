const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json());

//Send a get request to /quotes to see a list of quotes
app.get('/quotes',  async (req, res) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch(err) {
    res.json({message: err.message});
  }
});

//send a get request to /quotes/:id to see a quote

app.get('/quotes/:id', async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({message: "quote not found"});
    }
  } catch(err){
    res.json({message: err.message});
  }
});

//send a post request to /quotes create a new quote
app.post('/quotes', async (req, res) => {
  
  try {
    if (req.body.quote && req.body.author) {
      const quote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author
      });
      res.status(201);
      res.json(quote);
    } else {
      res.status(400).json({message: "Please include both a quote and an author"});
    }
  } catch(err){
    res.status(500);
    res.json({message: err.message});
  }
});
//send a PUT request to /quotes/:id to edit/update a quote

app.put("/quotes/:id", async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      quote.quote = req.body.quote,
      quote.author = req.body.author

      await records.updateQuote(quote);
      res.status(204).end();

    } else {
      res.status(404).json({message: "Quote not found"});
    }
  } catch(err) {
    res.status(500);
    res.json({message: err.message});
  }
});
// send a DELETE request to /quotes/:id to delete a quote

app.delete('/quotes/:id', async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      records.deleteQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({message: "Quote not found"});
    }
  } catch(err) {
    res.status(500);
    res.json({message: err.message});
  }
});
//send a GET request to /quotes/quote/random to see a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));