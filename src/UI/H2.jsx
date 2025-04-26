import React from 'react'

const H2 = ({ children }) => {
  return (
    <h2 className='font-bold text-white my-10 uppercase text-5xl lg:text-8xl' data-aos='fade-up'>
      {children}
    </h2>
  )
}

export default H2