//This is a react functional component

import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [topic, setTopic] = useState('');                             //using react hooks for state management            
  const [results, setResults] = useState([]);

  const searchTopic = async () => {
    try {
      // Make a request to the Google Search API
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyDzBKb9jsJg_7pwc9GVCGO1JvL_l9Z-yZQ&cx=d397e367c7667452f&q=${encodeURIComponent(
          topic
        )}`
      );

      // Extract search results from the API response
      const searchResults = response.data.items;

      // Set the results in state
      setResults(searchResults);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleQuestion = (question) => {
    // Display an alert with the user's question
    alert(`You asked: ${question}\nSorry, I don't have the answer right now.`);
  };

  return (
    <div>
      <h1 className='title'>Topic Search</h1>
      <div className='text-box'>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        className='search-box'
      />
     
      <button onClick={searchTopic} className='btn'>Search</button>
      </div>
      <div className='container'>
        {results.map((result) => (
          <div key={result.link}>
            <h3>{result.title}</h3>
            <p>{result.snippet}</p>
            <button onClick={() => handleQuestion(result.title)}>
              Ask a Question
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
