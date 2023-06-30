import React from 'react'
import Header from './Header'
import '../../styles/baseLayout.css'

const BaseLayout = ({children}) => {
    
  return (
    <>
    
        <Header />
          <div className="baseLayout">

            {children}
          
          </div>
      
    </>
  )
}

export default BaseLayout