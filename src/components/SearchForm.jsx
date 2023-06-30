import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDogs } from '../redux/dogs/dogsSlice';
import '../styles/searchForm.css'

const SearchForm = () => {
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState([])
    const [showBreedFilter, setShowBreedFilter] = useState(false)
    const [zipCode, setZipCode] = useState([]);
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');
    const [size, setSize] = useState('');
    const [sort, setSort] = useState('');
    const [sortType, setSortType] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    const dogs = useSelector(state=>state.dogs.dogs)
    const allBreeds = useSelector(state=>state.dogs.breeds)

    console.log(zipCode)

    useEffect(() => {
      
        if(sortOrder !== ('asc' || 'desc')){
            setSort(undefined)
        } else{
            setSort(`${sortType}:${sortOrder}`)
        }
      
    }, [sortOrder, sortType])  
  
    const handleSearch = (e) => {
      e.preventDefault();
      console.log('it is right hereeeeeeeeeee',zipCode)
  
      // Dispatch the searchDogs action with the selected search criteria
      dispatch(
        searchDogs({
          breeds,
          zipCode,
          ageMin: Number(ageMin),
          ageMax: Number(ageMax),
          size: Number(size),
          sort,
        })

      );

      setShowBreedFilter(false)

    };

    const handleSetBreeds = (e) => {

        setBreeds([e.target.value])

        setShowBreedFilter(true)

    }

    const handleAddBreed = (addedBreed) => {

        setBreeds([addedBreed])
        setShowBreedFilter(false)

    }
    
    const handleAgeMin = (e) => {
        if(e.target.value >= 0){
            setAgeMin(e.target.value)
        }
    }

    const handleAgeMax = (e) => {
        if(e.target.value >= 0){
            setAgeMax(e.target.value)
        }
    }

    const handleSize = (e) => {
        if(e.target.value >= 0){
            setSize(e.target.value)
        }
    }

    return (
        <>
            <form onSubmit={handleSearch}>
            {/* Breed selection */}
            <div className="p-2 d-flex">
                <label className='d-flex'>
                    Breed: &nbsp;
                    <div className="inputAndList">
                        <input type="text" 
                        value={[breeds]} 
                        onChange={(e) => handleSetBreeds(e)}
                        />
                        {(breeds !== [] && breeds[0] && showBreedFilter) && (
                            <div className="breedList">
                                {allBreeds.map(breedFromArray=>{
                                    if(breeds !== [] ){
                                        console.log(breedFromArray.toLowerCase())
                                        console.log(breeds)
                                        console.log(breeds[0])
                                        if(breedFromArray.toLowerCase().includes(breeds[0].toLowerCase())){
                                            console.log(breeds)
                                            return <div className="breedItem" onClick={()=>handleAddBreed(breedFromArray)} id={breedFromArray}>{breedFromArray}</div>
                                        }
                                    }
                                })}
                            </div>
                        )}
                    </div>
                </label>

            </div>

            {/* Zip codes */}
                <label>
                    Zip Codes: &nbsp;
                    <input type="text" value={zipCode} onChange={(e) => setZipCode([e.target.value])} />
                </label>
                
            {/* Age range */}
            <label>
                Age Min: &nbsp;
                <input type="number" value={ageMin} onChange={(e) => handleAgeMin(e)} />
            </label>
            <label>
                Age Max: &nbsp;
                <input type="number" value={ageMax} onChange={(e) => handleAgeMax(e)} />
            </label>
        
            {/* Size */}
            <label>
                Page Size: &nbsp;
                <input type="number" value={size} onChange={(e) => handleSize(e)} />
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
            </>
      );
    };

export default SearchForm;