import React from 'react'
import Section from './Section'
import H2 from '../UI/H2'
import StoreUnit from './StoreUnit'

const Stores = () => {
  return (
    <>
      <Section classes='mb-40 max-w-[90%] lg:w-3/4'>
        <div className='relative w-full text-center md:text-left'>
          <H2>OUR <span className='text-[#ffc000] '>STORES</span></H2>
          <div className='flex flex-wrap justify-center gap-10 md:gap-0 lg:justify-between '>
            <StoreUnit src='images_section/1.webp' logo='logos/khan.webp' />
            <StoreUnit src='images_section/10.webp' logo='logos/spice.webp' />
            <a href="https://morseink.net/en/" target='_blank'>
              <StoreUnit src='images_section/19.webp' logo='logos/morse.webp' />
            </a>
            <StoreUnit src='images_section/20.webp' logo='logos/fish.webp' />
          </div>

        </div>
      </Section>
    </>

  )
}

export default Stores