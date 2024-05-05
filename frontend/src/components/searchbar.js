// Searchbar.js

import React, { useState, useEffect } from 'react';

export const Searchbar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results,setResults] = useState(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://react-assign.onrender.com/api/course/search?keyword=${searchTerm}`,
          { method: "GET" }
        );
        const searchData = await response.json();
        if (response.ok) {
          onSearchResults(searchData); // Pass search results to parent component
          console.log(searchData);
          setResults(searchData.data)
        } else {
          setError('Failed to fetch search results');
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

   
      fetchSearchResults();
    
  }, [searchTerm]);

  return (
    <div className='w-[100%] flex items-center justify-center'>
      <input
        className='w-[80%] h-[40px] border-none p-8 bg-gray-100 text-gray-600'
        type="text"
        placeholder='Enter Course Name or Instructor Name'
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value) }}
      />
     {results?.length==0 && <div className='absolute text-gray-500'>No Such Course Found</div>}
    </div>
  );
};
