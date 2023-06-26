import React from 'react'
import Header from './Header'

const BaseLayout = ({children}) => {
    
  return (
    <>
    
        <div>
        <Header />
        <br /> <br />

            {children}
        </div>
      
    </>
  )
}

export default BaseLayout