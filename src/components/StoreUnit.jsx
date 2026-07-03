import Image from 'next/image';

const StoreUnit = ({ src, logo, logoWidth, logoHeight }) => {
  return (
    <div
      className="group relative w-[300px] h-[400px] md:gap-none md:w-[250px] md:h-[400px] 3xl:w-[300px] 3xl:h-[600px] hover:cursor-pointer hover:scale-105 rounded-2xl overflow-hidden flex justify-center filter: grayscale-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
      data-aos="fade-up"
      style={{ transition: 'all 0.3s ease-in-out' }}
    >
      <div className='absolute w-full h-full bg-black opacity-50'></div>
      <Image src={src} alt="" fill className="object-cover transition-all duration-300 ease-in-out" />
      <Image src={logo} alt="" width={logoWidth} height={logoHeight} className='absolute top-1/2 z-10 -translate-y-1/2 m-auto w-auto h-auto' />
    </div>
  );
};

export default StoreUnit;
