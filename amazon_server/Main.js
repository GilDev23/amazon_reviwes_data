const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const _ = require("lodash");
const cors = require("cors");
const app = express();
const result = [];
const pageSize = 10; // Set the number of items per page
const port = 3002;

app.use(cors()); // Enable CORS for all routes

// Read the CSV file
const parseStream = csv({ headers: false });

fs.createReadStream("train.csv")
  .pipe(parseStream)
  .on("data", (data) => {
    // Push data to the result array
    result.push(data);
  });
fs.createReadStream("test.csv")
  .pipe(csv({ headers: false }))
  .on("data", (data) => {
    // Push data to the result array
    result.push(data);
  })
  .on("end", () => {
    const negativeResponses = result.filter((entry) => entry["0"] === "1");

    const positiveResponses = result.filter((entry) => entry["0"] === "2");

    //popoular negative warlds
    const negativeWordFrequency = negativeResponses
      .flatMap((entry) => entry["2"].toLowerCase().split(/\s+/))
      .reduce((freqMap, word) => {
        freqMap[word] = (freqMap[word] || 0) + 1;
        return freqMap;
      }, {});

    const negativeSortedWords = Object.keys(negativeWordFrequency)
      .map((word) => ({ word, frequency: negativeWordFrequency[word] }))
      .sort((a, b) => b.frequency - a.frequency);

    const top50NegativeWords = negativeSortedWords.slice(0, 50); // Slice the result to include only the first 50 items

    //popoular positive warlds
    const positiveWordFrequency = positiveResponses
      .flatMap((entry) => entry["2"].toLowerCase().split(/\s+/))
      .reduce((freqMap, word) => {
        freqMap[word] = (freqMap[word] || 0) + 1;
        return freqMap;
      }, {});

    const positiveSortedWords = Object.keys(negativeWordFrequency)
      .map((word) => ({ word, frequency: negativeWordFrequency[word] }))
      .sort((a, b) => b.frequency - a.frequency);

    // Slice the result to include only the first 50 items
    const top50PositiveWords = positiveSortedWords.slice(0, 50);

    // Set up the GET endpoint to return search word
    app.get("/api/searchReviews", (req, res) => {
      const searchWord = req.query.word;

      if (!searchWord) {
        return res.status(400).json({ error: "Please provide a search word." });
      }

      const matchingReviews = result.filter((entry) =>
        entry["2"].toLowerCase().includes(searchWord.toLowerCase())
      );

      res.json(matchingReviews);
    });

    // Set up the GET endpoint to return paginated items
    app.get("/api/getItems", (req, res) => {
      const page = req.query.page || 1; // Get the page number from the query parameter

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const pageResult = result;

      const paginatedItems = pageResult.slice(startIdx, endIdx);
      res.json(paginatedItems);
    });

    // Set up the GET endpoint to return negative reviews
    app.get("/api/getNegativeResponses", (req, res) => {
      const page = req.query.page || 1;

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const pageResult = negativeResponses;

      const paginatedItems = pageResult.slice(startIdx, endIdx);
      res.json(paginatedItems);
    });

    // Set up the GET endpoint to return positive reviews
    app.get("/api/getPositiveResponses", (req, res) => {
      const page = req.query.page || 1;

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const pageResult = positiveResponses;

      const paginatedItems = pageResult.slice(startIdx, endIdx);
      res.json(paginatedItems);
    });

    // Set up the GET endpoint to return the most popolur word's in negative reviews
    app.get("/api/getPopolurNegativeResponses", (req, res) => {
      const page = req.query.page || 1; // Get the page number from the query parameter

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const pageResult = top50NegativeWords;

      const paginatedItems = pageResult.slice(startIdx, endIdx);
      res.json(paginatedItems);
    });

    // Set up the GET endpoint to return the most popolur word's in positive reviews
    app.get("/api/getPopolurPositiveResponses", (req, res) => {
      const page = req.query.page || 1; // Get the page number from the query parameter

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const pageResult = top50PositiveWords;

      const paginatedItems = pageResult.slice(startIdx, endIdx);
      res.json(paginatedItems);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
