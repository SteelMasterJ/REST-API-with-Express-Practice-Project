const express = require('express');
const router = express.Router();
const records = require('./records');

//Send a get request to /quotes to see a list of quotes
router.get('/quotes',  async (req, res) => {
    try {
      const quotes = await records.getQuotes();
      res.json(quotes);
    } catch(err) {
      res.json({message: err.message});
    }
  });
  
  //send a get request to /quotes/:id to see a quote
  
  router.get('/quotes/:id', async (req, res) => {
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
  router.post('/quotes', async (req, res) => {
    
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
  
  router.put("/quotes/:id", async (req, res) => {
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
  
  router.delete('/quotes/:id', async (req, res) => {
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
  router.get('/quotes/quote/random', async (req, res) => {
    try {
      const quote = await records.getRandomQuote();
      res.json(quote);
    } catch(err) {
      res.status(500);
      res.json({message: err.message});
    }
  });


  module.exports = router;