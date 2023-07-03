import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs } from '../redux/dogs/dogsSlice';
import { nextOrPrev} from '../redux/dogs/dogsSlice';
import Dog from './Dog'

const SearchResults = () => {

  const dogs = useSelector((state) => state.dogs.dogs);
  const loading = useSelector((state) => state.dogs.loading);
  const details = useSelector(state=>state.dogs.details);
  const query = useSelector(state=>state.dogs.query)
  console.log('query', query)
  
  const [page, setPage] = useState(1)
  
  const [pages, setPages] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (dogs.resultIds !== undefined) {
      dispatch(fetchDogs(dogs.resultIds));
      // saying if page === 1 so that pages value will not change when we load the last page of results
      if(page === 1){
        setPages(Math.ceil(dogs.total/dogs.resultIds.length))
        console.log('set pages')
        // setQuery(dogs.next)
        // console.log(query)
      }
    }
  }, [dispatch, dogs.resultIds]);

  useEffect(() => {
    
    setPage(1)
    
  }, [query])
  

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
                {(page !== pages) ? (
                    <button onClick={(e)=>handleNext(e.target.value)} value={dogs.next}>Next</button>
                ) : null}
                </div>
            </div>
        </div>
    </div>

    
    {details ? (
    <ul className="p-0">
      {details.map((dog, index) => (
      <Dog dogObj={dog} index={index}/>
      ))}
    </ul>
    ) : null
    }
    
    </>
  )
}

export default SearchResults
