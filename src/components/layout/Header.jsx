import React from 'react'
import  '../../styles/header.css'
import LogoutButton from '../LogoutButton'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const loggedIn = useSelector(state=>state.auth.loggedIn)
  const navigate = useNavigate()
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <img className="logo" src="/fetch_logo.webp" alt='fetch logo' height='60px' width='60px'></img>
        <div className="d-flex justify-content-end">
            {loggedIn && (
              <>
                      <div className="textLink" onClick={()=>navigate('/search')}>Search</div>
                      <div className="textLink" onClick={()=>navigate('/saved')}>Saved</div>
                      <LogoutButton/>
              </>
            )}
        </div>
      </div>
    </>
  )
}

export default Header
