import React from 'react'

const H3 = ({ children }) => {
  return (
    <h3 className='font-bold text-white mb-3 uppercase text-2xl lg:text-3xl' data-aos='fade-up'>
      {children}
    </h3>
  )
}

export default H3