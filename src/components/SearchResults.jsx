import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs } from '../redux/dogs/dogsSlice';
import { nextOrPrev} from '../redux/dogs/dogsSlice'


const SearchResults = () => {

  const dogs = useSelector((state) => state.dogs.dogs);
  const loading = useSelector((state) => state.dogs.loading);
  const details = useSelector(state=>state.dogs.details)

  const [page, setPage] = useState(1)
  
  const [pages, setPages] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (dogs.resultIds !== undefined) {
      dispatch(fetchDogs(dogs.resultIds));
      setPages(Math.ceil(dogs.total/dogs.resultIds.length))
    }
  }, [dispatch, dogs.resultIds]);

  useEffect(() => {
    if (dogs.resultIds !== undefined) {
      dispatch(fetchDogs(dogs.resultIds));
    }
  }, [dispatch, dogs.resultIds]);

  const handlePrev = (url) => {

    dispatch(nextOrPrev(url))
    setPage(page - 1)
    
  }

  const handleNext = (url) => {

    dispatch(nextOrPrev(url))
    setPage(page + 1)

  }
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (dogs.resultIds === undefined) {
    return <div>No results found.</div>;
  }
  return (
    <>

    <div className="row">
        <div className="col-6 offset-3 d-flex flex-column align-items-center mt-3">
        <div className="mb-3"><b>Total Results:</b> {dogs.total}</div>
            <div style={{width: "400px"}}className="row flex-direction-row">
                <div className="col-4 p-0">
                    {dogs.prev ? (
                    <button onClick={(e)=>handlePrev(e.target.value)} value={dogs.prev}>Previous</button>
                    ) : null}
                </div>
                <div className="col-4 p-0">
                    <b>Page:</b> {page} of {pages}
                </div>
                <div className="col-4 text-center p-0">
                {dogs.next ? (
                    <button onClick={(e)=>handleNext(e.target.value)} value={dogs.next}>Next</button>
                ) : null}
                </div>
            </div>
        </div>
    </div>

    
    {details ? (
    <ul className="m-3">
      {details.map((dog) => (
        <li key={dog.id} className="m-3">
            <div className="row">
                <div className="col-6">
                <img src={dog.img}></img>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <div>Name: {dog.name}</div>
                    <div>Age: {dog.age}</div>
                    <div>Breed: {dog.breed}</div>
                    <div>Zip Code: {dog.zip_code}</div>
                    <button>Favorite</button>
                </div>
            </div>
        </li>
      ))}
    </ul>
    ) : null
    }
    
    </>
  )
}

export default SearchResults
