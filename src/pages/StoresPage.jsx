import React from 'react'
import Stores from '../components/Stores'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Shops = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation duration in ms
      delay: 200, // delay before animation starts in ms
      once: true, // whether animation should happen only once or every time you scroll up/down to element
    });
  }, []);

  return (
    <>
      <div className='absolute w-full h-full'>
        <img src="egyptianMuesum1.webp" alt="" className='opacity-25 filter: grayscale-100 absolute left-0 -z-10 h-full w-full object-cover lg:w-auto lg:h-auto' />

      </div>
      <main className='mt-44'>
        <Stores />
      </main>
    </>

  )
}

export default Shops