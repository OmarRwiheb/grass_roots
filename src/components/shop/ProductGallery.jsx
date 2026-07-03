"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "swiper/css";
import "swiper/css/navigation";

const ProductGallery = ({ images, alt, isSale, discountPercentage, hasAnyAvailable }) => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const dimmed = !hasAnyAvailable ? "grayscale opacity-60" : "";
  const hasMultiple = images.length > 1;

  return (
    <div>
      <div className="relative aspect-[3/4] w-full max-h-[80vh] lg:max-h-[70vh] artifact-frame">
        <div className="relative w-full h-full overflow-hidden bg-[#141311] group/gallery">
          {hasMultiple ? (
            <Swiper
              modules={[Navigation, Keyboard]}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
              keyboard={{ enabled: true }}
              className="w-full h-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={`${img}-${i}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`${alt} ${i + 1}`}
                      fill
                      className={`object-cover ${dimmed}`}
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            images[0] && (
              <Image src={images[0]} alt={alt} fill className={`object-cover ${dimmed}`} priority />
            )
          )}

          {isSale && hasAnyAvailable && (
            <span className="absolute top-4 left-4 z-10 bg-[#ffc000] text-black text-xs font-bold uppercase tracking-wide px-3 py-1.5">
              −{discountPercentage}%
            </span>
          )}
          {!hasAnyAvailable && (
            <span className="absolute top-4 left-4 z-10 bg-[#141311] border border-white/30 text-white/80 text-xs font-bold uppercase tracking-wide px-3 py-1.5">
              Sold out
            </span>
          )}

          {hasMultiple && (
            <>
              <button
                className="gallery-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover/gallery:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-[#ffc000] hover:text-black"
                aria-label="Previous image"
              >
                <GoArrowLeft size={18} />
              </button>
              <button
                className="gallery-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover/gallery:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-[#ffc000] hover:text-black"
                aria-label="Next image"
              >
                <GoArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {hasMultiple && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={() => mainSwiper?.slideTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 h-20 shrink-0 overflow-hidden border transition-colors ${
                i === activeIndex ? "border-[#ffc000]" : "border-white/20 hover:border-white/50"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
