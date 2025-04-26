import React from 'react'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ImagesSection from '../components/ImagesSection'
import Footer from '../components/Footer'
import Stores from '../components/Stores'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Game from '../components/Game'

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation duration in ms
      delay: 200, // delay before animation starts in ms
    });
  }, []);

  return (
    <main className='m-auto bg-[#1f1e1d] text-white h-screen '>
      <Hero />
      <AboutSection />
      <Stores />
      <ImagesSection />
      <Game />
      <Footer />
    </main>
  )
}

export default Home