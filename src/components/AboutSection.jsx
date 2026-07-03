import Image from "next/image";
import Section from "./Section";
import H2 from "../UI/H2";

const AboutSection = () => {



  return (
    <>
      <Image src="/pharaoh.webp" alt="" width={1024} height={1024} className='absolute right-0 filter: grayscale-100 opacity-25 h-full w-full object-cover lg:w-auto lg:h-auto' />

      <Section classes='h-fit mb-44 max-w-[90%] overflow-hidden lg:w-3/4'>

        <div className="flex flex-wrap gap-20 justify-between">
          <div className=" text-center flex flex-col lg:items-center justify-center ">
            <H2 data-aos="fade-up">WHO <span className="text-[#ffc000]">ARE WE?</span></H2>
            <p className=" text-xl lg:text-2xl" data-aos="fade-up">Grass Roots is a 100% Egyptian company that aims to revive heritage and spread the culture rooted in our Egyptian identity — whether ancient or modern.
              <br /> <br /> Through curated commercial activities, we offer products and services that reflect our identity in a modern, tourist-friendly form that celebrates Egyptian culture globally.</p>
          </div>
        </div>
      </Section></>

  )
}

export default AboutSection
