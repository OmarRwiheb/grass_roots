import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from './Section'

const Hero = () => {
  const { scrollY } = useScroll()

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 160])
  const y2 = useTransform(scrollY, [0, 1000], [0, -240])
  const y3 = useTransform(scrollY, [0, 1000], [0, 300])
  const y4 = useTransform(scrollY, [0, 1000], [0, -280])
  const y5 = useTransform(scrollY, [0, 1000], [0, 240])
  const y6 = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <>
      <img src="egyptianMuesum1.webp" alt="" className='opacity-25 filter: grayscale-100 absolute left-0 -z-10 h-full w-full object-cover lg:w-auto lg:h-auto' />

      <Section classes='mb-40 h-screen'>
        <div className='flex flex-col items-center justify-center h-full relative'>
          <div>
            <h1 className='text-[50px] lg:text-9xl text-center font-bold mb-4 text-transparent stroke-text z-10 absolute'>
              GRASS ROOTS
            </h1>
            <h1 className='text-[50px] lg:text-9xl text-center font-bold mb-4 z-0'>
              GRASS ROOTS
            </h1>
          </div>
          <div className='h-0.5 w-[90%] lg:w-full bg-[#ffc000]'></div>
          <p className='z-10 w-[80%] mt-6 lg:mt-3 text-center text-2xl lg:text-4xl font-[Phenomena]'>From the depths of the <span className='text-[#ffc000]'>history</span>, we craft the <span className='text-[#ffc000]'>future</span>.</p>
        </div>
        <img
          src="hero.webp"
          alt="pharaoh hero main photo"
          className="absolute h-3/4 lg:h-full object-cover"
          style={{ filter: 'drop-shadow(0 0 70px rgb(255, 255, 255, 0.3))' }}
        />
        <div className='absolute w-full h-full'>
          <motion.img src="hero_images/1.webp" alt="" className='absolute w-20 top-1/6 blur-[5px]  lg:top-1/9 lg:left-0 lg:w-44 lg:-z-10 lg:blur-none lg:block' style={{ y: y2 }} />
          <motion.img src="hero_images/3.webp" alt="" className='absolute bottom-0 right-0 w-40 blur-[5px] lg:top-1/7 lg:right-0 lg:w-44 lg:-z-10 lg:blur-[2px] lg:block ' style={{ y: y3 }} />
          <motion.img src="hero_images/2.webp" alt="" className='absolute bottom-0 left-0 w-80 -z-10 blur-[5px] hidden lg:block' style={{ y: y5 }} />

          <motion.img src="hero_images/6.webp" alt="" className='absolute w-32 -right-0 top-1/10 lg:top-1/9 lg:left-1/4 lg:w-44 lg:blur-none lg:-z-10 lg:block ' style={{ y: y1 }} />
          <motion.img src="hero_images/4.webp" alt="" className='absolute top-0 right-1/4 w-44 -z-10 blur-[5px] hidden lg:block' style={{ y: y6 }} />
          <motion.img src="hero_images/5.webp" alt="" className='absolute w-20 bottom-0 left-0 lg:right-0 lg:left-auto lg:w-80 lg:-z-10 lg:blur-[5px]  lg:block ' style={{ y: y4 }} />
        </div>
      </Section >
    </>
  )
}

export default Hero