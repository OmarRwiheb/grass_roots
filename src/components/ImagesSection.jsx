import React from 'react'
import Section from './Section'
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const ImagesSection = () => {
  const images = [
    'images_section/1.webp',
    'images_section/2.webp',
    'images_section/3.webp',
    'images_section/4.webp',
    'images_section/5.webp',
    'images_section/6.webp',
    'images_section/7.webp',
    'images_section/8.webp',
    'images_section/9.webp',
    'images_section/10.webp',
    'images_section/11.webp',
    'images_section/12.webp',
    'images_section/13.webp',
    'images_section/14.webp',
    'images_section/15.webp',
    'images_section/16.webp',
    'images_section/17.webp',
    'images_section/18.webp',
    'images_section/19.webp',
    'images_section/20.webp',
  ];

  return (
    <>
      {/* <img src="pharaoh.png" className='absolute left-0  opacity-25  -z-10 ' alt="" /> */}
      <img src="egyptianMuesum3.png" className='absolute left-0  opacity-25 filter: grayscale-100  -z-10 h-full w-full object-cover lg:w-auto lg:h-auto' alt="" />

      <Section classes={'mb-40 lg:my-40 lg:py-40 '}>
        <div className='lg:absolute w-screen h-full overflow-x-clip'>
          <img src="lotus8.png" alt="" className='lg:absolute right-0 top-1/2 lg:w-1/3 lg:-translate-y-1/2 -rotate-180 lg:-rotate-90' />
        </div>
        <div className='relative w-full'>
          <Swiper
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },

            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"

          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} >
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className=" object-cover rounded-2xl shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='absolute flex w-full justify-center gap-20 mt-20'>
            <button className="prev hover:cursor-pointer text-[#ffc000]"><GoArrowLeft size={35} /></button>
            <button className="next hover:cursor-pointer text-[#ffc000]"><GoArrowRight size={35} /></button>
          </div>

        </div>
      </ Section >
    </>

  )
}

export default ImagesSection;
