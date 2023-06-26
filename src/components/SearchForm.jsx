import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDogs } from '../redux/dogs/dogsSlice';

const SearchForm = () => {
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState('');
    const [zipCodes, setZipCodes] = useState('');
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');
    const [size, setSize] = useState('');
    const [from, setFrom] = useState('');
    const [sort, setSort] = useState('');
  
    const handleSearch = (e) => {
      e.preventDefault();
  
      // Dispatch the searchDogs action with the selected search criteria
      dispatch(
        searchDogs({
          breeds,
          zipCodes,
          ageMin: Number(ageMin),
          ageMax: Number(ageMax),
          size: Number(size),
          from: Number(from),
          sort,
        })
      );
    };

    return (
        <form onSubmit={handleSearch}>
          {/* Breed selection */}
          <label>
            Breeds:
            <input type="text" value={breeds} onChange={(e) => setBreeds(e.target.value.split(','))} />
          </label>
    
          {/* Zip codes */}
          <label>
            Zip Codes:
            <input type="text" value={zipCodes} onChange={(e) => setZipCodes(e.target.value.split(','))} />
          </label>
    
          {/* Age range */}
          <label>
            Age Min:
            <input type="number" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
          </label>
          <label>
            Age Max:
            <input type="number" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
          </label>
    
          {/* Size */}
          <label>
            Size:
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
          </label>
    
          {/* From */}
          <label>
            From:
            <input type="number" value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
    
          {/* Sort */}
          <label>
            Sort:
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="field:asc">Field Ascending</option>
              <option value="field:desc">Field Descending</option>
            </select>
          </label>
    
          {/* Submit button */}
          <button type="submit">Search</button>
        </form>
      );
    };

export default SearchForm;