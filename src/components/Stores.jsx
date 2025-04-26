import React from 'react'
import Section from './Section'
import H2 from '../UI/H2'
import StoreUnit from './StoreUnit'

const Stores = () => {
  return (
    <Section classes='mb-40 max-w-[90%]'>
      <div className='relative w-full '>
        <H2>OUR <span className='text-[#ffc000]'>STORES</span></H2>
        <div className='flex flex-wrap justify-center gap-10 lg:justify-between '>
          <StoreUnit src='images_section/1.webp' logo='logos/khan.webp' />
          <StoreUnit src='images_section/10.webp' logo='logos/spice.webp' />
          <StoreUnit src='images_section/19.webp' logo='logos/morse.webp' />
          <StoreUnit src='images_section/20.webp' logo='logos/fish.webp' />
        </div>

      </div>
    </Section>
  )
}

export default Stores