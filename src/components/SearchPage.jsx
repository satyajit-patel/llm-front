import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = import.meta.env.VITE_GOBAL;
  console.log(url);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      // const result = await axios.post(`${import.meta.env.VITE_GLOBAL}/generate`, { query });
      const result = await axios.post(`https://llm-back-1.onrender.com/generate`, { query });
      setResponse(result.data.response);
    } catch (err) {
      console.log(err.message);
      setError('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Search and Get Response</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Enter your query"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Search
      </button>
      {loading && <p className="mt-4">Loading, please wait...</p>}
      {response && !loading && <div className="mt-4 p-4 border border-gray-300 rounded">{response}</div>}
      {error && !loading && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchPage;
