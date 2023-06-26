import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SearchResults = () => {

  const searchResults = useSelector((state) => state.dogs.searchResults);
  const loading = useSelector((state) => state.dogs.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (searchResults.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <>
    {searchResults ? (
    <ul>
      {searchResults.map((dogId) => (
        <li key={dogId}>{dogId}</li>
      ))}
    </ul>
    ) : null
    }
    
    </>
  )
}

export default SearchResults
