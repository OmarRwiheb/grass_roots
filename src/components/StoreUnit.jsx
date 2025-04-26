import React from 'react';

const StoreUnit = ({ src, logo }) => {
  return (
    <div
      className="relative w-full md:w-[300px] h-[600px] hover:cursor-pointer hover:scale-105 rounded-2xl overflow-hidden flex justify-center"
      data-aos="fade-up"
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      <img src={src} alt="" className="object-cover h-full w-full opacity-20 filter: grayscale-100" />
      <img src={logo} alt="" className='absolute top-1/2 z-10 -translate-y-1/2 m-auto' />
    </div>
  );
};

export default StoreUnit;
