import React from 'react';
import H3 from '../UI/H3';

const Footer = () => {
  return (
    <footer className="text-white relative z-10 w-full">
      {/* Background image full width */}
      <img src="footer1.webp" alt="" className="w-full" />

      <div>
        {/* Decorative gradient overlay */}
        <div className="absolute -translate-y-1/2 w-full h-[100px] lg:h-[200px] z-20 bg-gradient-to-b from-transparent via-[#D89100] to-transparent"></div>

        {/* Footer content area */}
        <div className="w-full h-fit bg-[#D89100] pt-22">
          {/* Centered content container */}
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap lg:justify-around gap-10 mb-12">
            <div>
              <div className='max-w-7xl mx-auto px-4 flex flex-wrap lg:justify-around gap-10 mb-12'>
                {/* Our Shops */}
                <div>
                  <H3>OUR SHOPS</H3>
                  <div className="flex flex-col items-start gap-2">
                    <a>Khan El Khalili</a>
                    <a href="https://www.instagram.com/spice.and.more.egy/" target='_blank'>Spice and More</a>
                    <a href="https://morseink.net/en/" target='_blank'>Morse inc.</a>
                    <a href="https://g.co/kgs/7r2YEEG" target='_blank'>Fish & Chips</a>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <H3>CONTACT US</H3>
                  <div className="flex flex-col items-start gap-2">
                    <a href="mailto:grass.roots.cairo@gmail.com">
                      grass.roots.cairo@gmail.com
                    </a>
                    <a href="tel:+201099749005">
                      +20 109 974 9005
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex w-full justify-center items-center mt-10'>
                <img src="new-logo_web.webp" className='bg-white rounded-full w-28 md:w-36 p-1' alt="" />
                <img src="new-logo_web1.webp" className=' rounded-full w-28 md:w-36 p-2' alt="" />
                <img src="new-logo_web3.webp" className=' rounded-full w-28 md:w-36 p-2' alt="" />
              </div>
            </div>

            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1331.5641752805534!2d31.234825983448655!3d30.04689017264087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c68e2c85b1%3A0x2c8b40258e217fde!2s9%20Meret%20Basha%2C%20Ismailia%2C%20Qasr%20El%20Nil%2C%20Cairo%20Governorate%204272110!5e0!3m2!1sen!2seg!4v1745640864776!5m2!1sen!2seg"
              width="700"
              height="250"
              style={{ border: '0px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </div>

          {/* Copyright */}
          <div className="pb-10">
            <p className="text-center">Tax Registration 760-919-518</p>
            <p className="text-center">&copy; 2025 Grass Roots. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
