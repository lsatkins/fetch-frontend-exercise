import React, {useEffect} from 'react'
import {fetchDogBreeds, searchDogs, clearState} from '../redux/dogs/dogsSlice'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import LogoutButton from './LogoutButton'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const SearchPage = () => {

    const loggedIn = useSelector(state=>state.auth.loggedIn)
    console.log(loggedIn)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // checking global state to see if user is logged in
    useEffect(() => {

        if(loggedIn){

            dispatch(fetchDogBreeds())

        } else{
            dispatch(clearState())
            navigate('/login')
        }

    }, [dispatch, loggedIn, navigate])
    
  return (
    <>

    <SearchForm />

    <SearchResults/>

    <LogoutButton/>
    
    </>
  )
}

export default SearchPage
