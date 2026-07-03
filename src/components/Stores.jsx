"use client";

import { useState } from 'react'
import Section from './Section'
import H2 from '../UI/H2'
import StoreUnit from './StoreUnit'
import VideoModal from './VideoModal'

const Stores = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleVideoClick = () => {
    setIsVideoModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsVideoModalOpen(false)
  }

  return (
    <>
      <Section classes='mb-40 max-w-[90%] lg:w-3/4'>
        <div className='relative w-full text-center md:text-left'>
          <H2>OUR <span className='text-[#ffc000] '>STORES</span></H2>
          <div className='flex flex-wrap justify-center gap-10 md:gap-0 lg:justify-between '>
            <StoreUnit src='/images_section/1.webp' logo='/logos/khan.webp' logoWidth={300} logoHeight={300} />
            <a href="https://spiceandmore.grassroots-eg.com/" target='_blank'><StoreUnit src='/images_section/10.webp' logo='/logos/spice.webp' logoWidth={300} logoHeight={300} /></a>
            <div onClick={handleVideoClick}>
              <StoreUnit src='/images_section/21.webp' logo='/logos/egyptian_torqouize.png' logoWidth={500} logoHeight={500} />
            </div>
            <a href="https://g.co/kgs/7r2YEEG" target='_blank'><StoreUnit src='/images_section/20.webp' logo='/logos/fish.webp' logoWidth={300} logoHeight={300} /></a>
          </div>
        </div>
      </Section>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseModal}
        videoSrc="/vid/IMG_6605.mp4"
      />
    </>

  )
}

export default Stores
