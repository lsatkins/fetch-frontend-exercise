import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDogs } from '../redux/dogs/dogsSlice';
import '../styles/searchForm.css'
import {checkBreeds} from '../functions/functions'

const SearchForm = () => {
    const dispatch = useDispatch();
    const [breed, setBreed] = useState('');
    const [breeds, setBreeds] = useState([])
    const [zipCode, setZipCode] = useState('');
    const [zipCodes, setZipCodes] = useState([])
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');
    const [size, setSize] = useState('');
    const [sort, setSort] = useState('');
    const [sortType, setSortType] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    const dogs = useSelector(state=>state.dogs.dogs)
    const allBreeds = useSelector(state=>state.dogs.breeds)

    useEffect(() => {
      
        if(sortOrder !== ('asc' || 'desc')){
            setSort(undefined)
        } else{
            setSort(`${sortType}:${sortOrder}`)
        }
      
    }, [sortOrder, sortType])  
  
    const handleSearch = (e) => {
      e.preventDefault();
      console.log(breeds)
  
      // Dispatch the searchDogs action with the selected search criteria
      dispatch(
        searchDogs({
          breeds,
          zipCodes,
          ageMin: Number(ageMin),
          ageMax: Number(ageMax),
          size: Number(size),
          sort,
        })
      );

    };

    const handleAddBreed = (addedBreed) => {

        if(breeds.includes(addedBreed)){       
        }
        else{
            setBreeds([...breeds, addedBreed])
        }
        console.log(breeds)
        console.log(allBreeds)

    }

    const handleRemoveBreed = (removedBreed) => {
        const updatedBreeds = breeds.filter((breed) => breed !== removedBreed);
        setBreeds(updatedBreeds);
      };
      

    return (
        <div>
            <form onSubmit={handleSearch}>
            {/* Breed selection */}
            <div className="m-2 d-flex">
                <label className='d-flex'>
                    Search Breeds: &nbsp;
                    <div className="inputAndList">
                        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
                        {breed != '' && (
                            <div className="breedList">
                                {allBreeds.map(breedFromArray=>{
                                    if(breed && breedFromArray.toLowerCase().includes(breed.toLowerCase())){
                                        console.log(breed)
                                        return <div className="breedItem" onClick={()=>handleAddBreed(breedFromArray)} id={breedFromArray}>{breedFromArray}</div>
                                    }
                                })}
                            </div>
                        )}
                    </div>
                </label>
                {breeds.length > 0 && (
                    <div className="addedBreeds">
                        {breeds.map((breed) => (
                        <div key={breed} className="d-flex breedAndX">
                            <div>{breed}</div> &nbsp;
                            <div className="x" onClick={() => handleRemoveBreed(breed)}>
                                X
                            </div>
                        </div>
                        ))}
                    </div>
                )}

            </div>

            {/* Zip codes */}
                <label>
                    Zip Codes: &nbsp;
                    <input type="text" value={zipCodes} onChange={(e) => setZipCodes(e.target.value.split(','))} />
                </label>
                <button type="submit">Add Zip Code</button>
        
            {/* Age range */}
            <label>
                Age Min: &nbsp;
                <input type="number" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
            </label>
            <label>
                Age Max: &nbsp;
                <input type="number" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
            </label>
        
            {/* Size */}
            <label>
                Page Size: &nbsp;
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </label>
        
            {/* Sort */}
            <label>
                Sort By: &nbsp;
                {console.log(sort)}
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="breed">Breed</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">None</option>
                <option value="asc">Field Ascending</option>
                <option value="desc">Field Descending</option>
                </select>
            </label>
        
            {/* Submit button */}
            <button type="submit">Search</button>
            </form>
        </div>
      );
    };

export default SearchForm;