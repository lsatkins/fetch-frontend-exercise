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

    useEffect(() => {
      
        if(sortOrder !== 'asc' && sortOrder !== 'desc'){
            setSort(undefined)
        } else{
            setSort(`${sortType}:${sortOrder}`)
        }
        console.log(sortOrder)
      
    }, [sortOrder, sortType])  
  
    const handleSearch = (e) => {
      e.preventDefault();
      console.log('it is right hereeeeeeeeeee',zipCode)
      console.log(sort)
  
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
            <form className="border border-dark border-2 rounded m-2" onSubmit={handleSearch}>
            {/* Breed selection */}
            <div className="row p-2 justify-content-center">
                <div className="col-6 d-flex justify-content-center">
                    <label className="d-flex">
                        Breed: &nbsp;
                        <div className="inputAndList ms-1">
                            <input type="text" 
                            value={[breeds]} 
                            onChange={(e) => handleSetBreeds(e)}
                            />
                            {(breeds !== [] && breeds[0] && showBreedFilter) && (
                                <div className="breedList">
                                    {allBreeds.map(breedFromArray=>{
                                        if(breeds !== [] ){
                                            if(breedFromArray.toLowerCase().includes(breeds[0].toLowerCase())){
                                                return <div className="breedItem" onClick={()=>handleAddBreed(breedFromArray)} id={breedFromArray}>{breedFromArray}</div>
                                            }
                                        }
                                    })}
                                </div>
                            )}
                        </div>
                    </label>

                </div>
                    <div className="col-6 d-flex justify-content-center">
                    {/* Zip codes */}
                        <label className="d-flex">
                            Zip Code: &nbsp;
                            <input type="text" value={zipCode} onChange={(e) => setZipCode([e.target.value])} />
                        </label>
                    </div>

            </div>

            <div className="row p-2 justify-content-center">
                <div className="col-6 d-flex justify-content-center">   
                    {/* Age range */}
                    <label className="d-flex">
                        Age Min: &nbsp;
                        <input type="number" value={ageMin} onChange={(e) => handleAgeMin(e)} />
                    </label>
                </div>
                <div className="col-6 d-flex justify-content-center">   
                    <label className="d-flex">
                        Age Max: &nbsp;
                        <input type="number" value={ageMax} onChange={(e) => handleAgeMax(e)} />
                    </label>
                </div>
            </div>
            

            <div className="row p-2 justify-content-center">
                <div className="col-6 d-flex justify-content-center">   
                    {/* Size */}
                    <label className="d-flex">
                        Page Size: &nbsp;
                        <input type="number" value={size} onChange={(e) => handleSize(e)} />
                    </label>
                </div>
            
                <div className="col-6 d-flex justify-content-center">   
                    {/* Sort */}
                    <label>
                        <div className="row text-start">
                            <div className="col-12">
                                Sort By: &nbsp;
                                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                                    <option value="">None</option>
                                    <option value="name">Name</option>
                                    <option value="age">Age</option>
                                </select>
                            </div>
                            <div className="col-12">
                                Order: &nbsp;
                                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                    <option value="">None</option>
                                    <option value="asc">Field Ascending</option>
                                    <option value="desc">Field Descending</option>
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        
            {/* Submit button */}
            <div className="row p-2 justify-content-center">
                <div className="col-12">
                    <button type="submit">Search</button>
                </div>
            </div>
            
            </form>
            </>
      );
    };

export default SearchForm;